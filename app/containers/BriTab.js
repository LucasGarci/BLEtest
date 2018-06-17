import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BigSlider from "react-native-big-slider";
import BleManager from "react-native-ble-manager";
import I18n from "../../I18n/I18n";
import { theme } from "../assets/colorThemes";
import { store } from "../redux/store";
import { setBrightness } from "../redux/actions";
import { connect } from "react-redux";

var conversor = require("convert-hex");

@connect(state => {
  return {
    power: state.power,
  };
})
export class BriTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: this.props.power,
      brightness: 30,
      devicesConnected: {},
      deviceInfo: {},
    };
    this.writing = false;
  }

  componentDidMount() {
    this.retrieveConnected();
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      console.log({ ConnectedDevices: results });
      this.setState({ devicesConnected: results });
    });
  }

  async changeBrightness(intensity) {
    this.setState({ brightness: intensity });
    const brightness = intensity / 100;
    store.dispatch(setBrightness(brightness));
    if (!this.writing) {
      this.writing = true;
      BleManager.checkState();
      const device = this.state.devicesConnected[0];

      //Sacamos los servicios
      await BleManager.retrieveServices(device.id)
        .then(deviceInfo => {
          this.setState({ deviceInfo });
        })
        .catch(error => {
          console.log(error);
        });

      const deviceInfo = this.state.deviceInfo;

      //Creamos enlace o certificamos que esta creado
      await BleManager.createBond(deviceInfo.id)
        .then(() => {
          console.log("Bonding its OK");
        })
        .catch(() => {
          console.log("Fail to bond");
        });

      const rgbColor = store.getState().color;
      const mode = "0x56";
      // Debemos pasar la cadena a hexadecimal y que sea un valor de dos dígitos
      const r = secureByte(rgbColor.r.toString(16));
      const g = secureByte(rgbColor.g.toString(16));
      const b = secureByte(rgbColor.b.toString(16));
      //concatenamos mode+r+g+b+constant
      const colorToWrite = mode.concat(r, g, b, "00f0aa");
      console.log({ colorToWrite: colorToWrite });

      const data = conversor.hexToBytes(colorToWrite);
      console.log({ dataToWrite: data });

      data[1] = Math.round(data[1] * brightness);
      data[2] = Math.round(data[2] * brightness);
      data[3] = Math.round(data[3] * brightness);

      //  BleManager.checkState
      await BleManager.write(
        deviceInfo.id,
        deviceInfo.characteristics[3].service,
        deviceInfo.characteristics[3].characteristic,
        data
      )
        .then(() => {
          store.dispatch(setColor(rgbColor));
          // Success code
          console.log("Writed: " + data);
        })
        .catch(error => {
          // Failure code
          console.log(error);
        });

      this.writing = false;
    }
  }

  render() {
    const sliderColor = theme().bigSlider;
    const labelColor = theme().textColor;
    return (
      <View style={[styles.centerContainer]}>
        <BigSlider
          style={{ width: 110 }}
          trackStyle={{ backgroundColor: sliderColor }}
          maximumValue={100}
          minimumValue={0}
          value={this.state.brightness}
          onValueChange={value => this.changeBrightness(value)}
          renderLabel={() => (
            <BrightnessLabel
              brightness={this.state.brightness}
              power={this.state.power}
              color={labelColor}
            />
          )}
        />
      </View>
    );
  }
}

const BrightnessLabel = props => {
  return (
    <View flex={1} justifyContent="center">
      <Text
        style={[styles.brightnessLabel, props.style, { color: props.color }]}
      >
        {(() => {
          return props.power
            ? `${formatNumber(props.brightness || 0)}%\n ${I18n.t(
                "Brightness"
              )}`
            : "Off";
        })()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  brightnessLabel: {
    textAlign: "center",
    padding: 20
  },
  topButtons: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 15
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 25
  }
});

function formatNumber(x) {
  return parseInt(x, 10)
    .toFixed(1)
    .replace(/.?0*$/, "");
}
