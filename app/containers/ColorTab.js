import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  NativeEventEmitter,
  NativeModules
} from "react-native";
import { ColorWheel } from "react-native-color-wheel";
import { hsv2Rgb } from "colorsys";
import { PrefabPicker } from "../components/PrefabPicker";
import BleManager from "react-native-ble-manager";

var conversor = require("convert-hex");
//We get the class to subscribe
const BleManagerModule = NativeModules.BleManager;
//We create our events emitter
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export class ColorTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "",
      devicesConnected: {},
      deviceInfo: {},
      lastUpdateValue: {}
    };
    this.writing = false;
    this.handleBleManagerDidUpdateState = this.handleBleManagerDidUpdateState.bind(
      this
    );
  }

  componentDidMount() {
    this.retrieveConnected();
    this.handlerUpdate = bleManagerEmitter.addListener(
      "BleManagerDidUpdateState",
      this.handleBleManagerDidUpdateState
    );
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      console.log({ ConnectedDevices: results });
      this.setState({ devicesConnected: results });
    });
  }

  handleBleManagerDidUpdateState(data) {
    console.log(
      "Received data from " +
        data.peripheral +
        " characteristic " +
        data.characteristic,
      data.value
    );
    this.setState({ lastUpdateValue: data });
  }

  verifications() {}

  async handleOnPress(turn) {
    BleManager.checkState();
    const device = this.state.devicesConnected[0];
    console.log({ CT_devConected: device });

    //Sacamos los servicios
    await BleManager.retrieveServices(device.id)
      .then(deviceInfo => {
        console.log({ CT_devInf: deviceInfo });
        this.setState({ deviceInfo });
      })
      .catch(error => {
        console.log(error);
      });

    const deviceInfo = this.state.deviceInfo;
    // Esta es la unica caracteristica que responde a startNotific...
    await BleManager.startNotification(
      deviceInfo.id,
      deviceInfo.characteristics[4].service,
      deviceInfo.characteristics[4].characteristic
    ).catch(errNotif => console.log({ errNotif }));

    //Creamos enlace o certificamos que esta creado
    await BleManager.createBond(deviceInfo.id)
      .then(() => {
        console.log("Bonding its OK");
      })
      .catch(() => {
        console.log("Fail to bond");
      });

    const off = "CC2433";
    const on = "CC2333";
    const go = turn === "ON" ? on : off;

    const data = conversor.hexToBytes(go);

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

  async handleColorChange(color) {
    if (!this.writing) {
      this.writing = true;
      BleManager.checkState();
      const rgbColor = hsv2Rgb(color.h, color.s, color.v);
      this.setState({ currentColor: rgbColor });
      console.log({ colorIs: this.state.currentColor });
      const device = this.state.devicesConnected[0];
      console.log({ CT_devConected: device });

      //Sacamos los servicios
      await BleManager.retrieveServices(device.id)
        .then(deviceInfo => {
          console.log({ CT_devInf: deviceInfo });
          this.setState({ deviceInfo });
        })
        .catch(error => {
          console.log(error);
        });

      const deviceInfo = this.state.deviceInfo;
      // Esta es la unica caracteristica que responde a startNotific...
      await BleManager.startNotification(
        deviceInfo.id,
        deviceInfo.characteristics[4].service,
        deviceInfo.characteristics[4].characteristic
      ).catch(errNotif => console.log({ errNotif }));

      //Creamos enlace o certificamos que esta creado
      await BleManager.createBond(deviceInfo.id)
        .then(() => {
          console.log("Bonding its OK");
        })
        .catch(() => {
          console.log("Fail to bond");
        });

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

      //  BleManager.checkState

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
      this.writing = false;
    } else {
      console.log("no ha escrito");
    }
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
        <View style={styles.buttonContainer}>
          <Button
            title="ON"
            onPress={() => this.handleOnPress("ON")}
            style={styles.textOption}
          />
          <Button
            title="OFF"
            onPress={() => this.handleOnPress("OFF")}
            style={styles.textOption}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
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
  },
  textOption: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#606060"
  }
});

secureByte = function(byteString) {
  if (byteString.length === 1) {
    byteString = "0".concat(byteString);
  }
  return byteString;
};
