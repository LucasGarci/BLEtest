import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  NativeEventEmitter,
  NativeModules
} from "react-native";
import { Card } from "react-native-elements";
import { hsv2Hex, hsv2Rgb, hex2Rgb, hex2Hsv } from "colorsys";
import BleManager from "react-native-ble-manager";

var conversor = require("convert-hex");
//We get the class to subscribe
const BleManagerModule = NativeModules.BleManager;
//We create our events emitter
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export class PrefabPicker extends Component {
  constructor() {
    super();
    this.state = {
      color1: "#ff0000",
      color2: "#00ff00",
      color3: "#2020ff",
      color4: "#ffff00",
      devicesConnected: {},
      deviceInfo: {},
      lastUpdateValue: {}
    };
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

  async handleColorChange(color) {
    this.setState({ currentColor: color });
    BleManager.checkState();
    const rgbColor = hex2Rgb(color);
    this.setState({ currentColor: rgbColor });
    const device = this.state.devicesConnected[0];

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
  }

  onPress1 = () => {
    console.log("Pulsado 1 ");
  };
  onLongPress1 = () => {
    console.log("Pulsado 1 ");
    const color = hsv2Hex(
      this.props.color.h,
      this.props.color.s,
      this.props.color.v
    );
    this.setState({ color1: color });
  };
  onPress2 = () => {
    console.log("Pulsado 2 ");
  };
  onLongPress2 = () => {
    console.log("Pulsado 2 ");
    const color = hsv2Hex(
      this.props.color.h,
      this.props.color.s,
      this.props.color.v
    );
    this.setState({ color2: color });
  };
  onPress3 = () => {
    console.log("Pulsado 3");
  };
  onLongPress3 = () => {
    console.log("Manten Pulsado 3");
    const color = hsv2Hex(
      this.props.color.h,
      this.props.color.s,
      this.props.color.v
    );
    this.setState({ color3: color });
  };
  onPress4 = () => {
    console.log("Pulsado 4");
  };
  onLongPress4 = () => {
    console.log("Pulsado 4");
    const color = hsv2Hex(
      this.props.color.h,
      this.props.color.s,
      this.props.color.v
    );
    this.setState({ color4: color });
  };
  render() {
    return (
      <View
        style={{
          //  flex: 1,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View style={styles.pickerItem}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.state.color1,
              borderRadius: 45
            }}
            onPress={() => {
              this.onPress1();
              this.handleColorChange(this.state.color1)
            }}
            onLongPress={() => {
              this.onLongPress1();
            }}
          >
            <Text>{JSON.stringify(this.state.color1)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerItem}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.state.color2,
              borderRadius: 45
            }}
            onPress={() => {
              this.handleColorChange(this.state.color2)
            }}
            onLongPress={() => {
              this.onLongPress2();
            }}
          >
            <Text>{JSON.stringify(this.state.color2)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerItem}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.state.color3,
              borderRadius: 45
            }}
            onPress={() => {
              this.handleColorChange(this.state.color3)
            }}
            onLongPress={() => {
              this.onLongPress3();
            }}
          >
            <Text>{JSON.stringify(this.state.color3)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerItem}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.state.color4,
              borderRadius: 45
            }}
            onPress={() => {
              this.handleColorChange(this.state.color4)
            }}
            onLongPress={() => {
              this.onLongPress4();
            }}
          >
            <Text>{JSON.stringify(this.state.color4)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerItem: {
    width: 70,
    height: 70,
    margin: 10,
    borderWidth: 2,
    borderRadius: 45
  },
  touchItem: {}
});
