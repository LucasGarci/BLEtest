import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BigSlider from "react-native-big-slider";
import BleManager from "react-native-ble-manager";
import I18n from "../../I18n/I18n";
import { getCurrentTheme } from "../assets/colorThemes";

export class BriTab extends React.Component {
  constructor() {
    super();
    this.state = {
      power: true,
      brightness: 30,
      devicesConnected: {}
    };
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

  onPress = () => {
    console.log("BriTab");
  };

  changeBrightness = brightness => {
    this.setState({ brightness });
    console.log({ BRILLO: this.state.brightness });
  };

  render() {
    const sliderColor = getCurrentTheme().bigSlider;
    const labelColor = getCurrentTheme().textColor;
    console.log({ COLOR: sliderColor });
    return (
      <View style={[styles.centerContainer]}>
        <BigSlider
          style={{ width: 110 }}
          trackStyle={{ backgroundColor: sliderColor }}
          maximumValue={100}
          minimumValue={0}
          value={this.state.brightness}
          onValueChange={this.changeBrightness}
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
  console.log('LABEL COLOR IS' , props.color)
  return (
    <View flex={1} justifyContent="center">
      <Text
        style={[styles.brightnessLabel, props.style, { color: props.color}]}
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
