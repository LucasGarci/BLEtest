import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { ColorWheel } from "react-native-color-wheel";
import { PrefabPicker } from "../components/PrefabPicker";
import BleManager from "react-native-ble-manager";

var conversor = require("convert-hex");

export class ColorTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "",
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

  async handleColorChange(color) {
    const rgbColor = hsv2Rgb(color.h, color.s, color.v);
    this.setState({ currentColor: rgbColor });
    console.log({ colorIs: this.state.currentColor });
    const device = this.state.devicesConnected[0];
    console.log({ CT_devConected: device });
    await BleManager.retrieveServices(device.id)
      .then(deviceInfo => {
        console.log({ CT_devInf: deviceInfo });
        // Esta es la unica caracteristica que responde a startNotific...
        BleManager.startNotification(
          deviceInfo.id,
          deviceInfo.characteristics[4].service,
          deviceInfo.characteristics[4].characteristic
        ).catch(errNotif => console.log({ errNotif }));
        return deviceInfo;
      })
      .then(async deviceInfo => {
        await BleManager.createBond(deviceInfo.id)
          .then(() => {
            console.log(
              "createBond success or there is already an existing one"
            );
          })
          .catch(() => {
            console.log("fail to bond");
          });

        const colorToSend = "0x56";
        const cs = colorToSend.concat(rgbColor.r.toString(16), rgbColor.g.toString(16), rgbColor.b.toString(16), "00f0aa");

        console.log({ cs });

        const data = conversor.hexToBytes(cs);
        console.log({ dataToWrite: data });
        for (let index = 0; index < 10; index++) {
          await BleManager.write(
            deviceInfo.id,
            deviceInfo.characteristics[3].service,
            deviceInfo.characteristics[3].characteristic,
            data
          )
            .then(() => {
              index = 10;
              // Success code
              console.log("Writed: " + data);
            })
            .catch(error => {
              // Failure code
              console.log(error);
            });
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.centerContainer}>
          <ColorWheel
            initialColor="#ff0000"
            onColorChange={color => this.handleColorChange(color)}
            style={styles.wheelStyle}
            thumbStyle={styles.thumb}
          />
        </View>
        <View style={styles.centerContainer}>
          <PrefabPicker color={this.state.currentColor} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  wheelStyle: {
    width: Dimensions.get("window").width / 1.25,
    marginTop: 25
  },
  thumb: {
    height: 30,
    width: 30,
    borderRadius: 10
  }
});

hsv2Rgb = function(h, s, v) {
  if (typeof h === "object") {
    const args = h;
    h = args.h;
    s = args.s;
    v = args.v;
  }

  h = _normalizeAngle(h);
  h = h === 360 ? 1 : ((h % 360) / parseFloat(360)) * 6;
  s = s === 100 ? 1 : (s % 100) / parseFloat(100);
  v = v === 100 ? 1 : (v % 100) / parseFloat(100);

  var i = Math.floor(h);
  var f = h - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q, p, p, t, v][mod];
  var g = [t, v, v, q, p, p][mod];
  var b = [p, p, t, v, v, q][mod];

  return {
    r: Math.floor(r * 255),
    g: Math.floor(g * 255),
    b: Math.floor(b * 255)
  };
};

function _normalizeAngle(degrees) {
  return ((degrees % 360) + 360) % 360;
}
