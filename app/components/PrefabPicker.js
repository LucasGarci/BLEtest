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
import { store } from "../redux/store";
import { setColor } from "../redux/actions";

var conversor = require("convert-hex");

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
    BleManager.checkState();
    const rgbColor = hex2Rgb(color);
    store.dispatch(setColor(rgbColor));
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
    const mode = "0x56";
    // Debemos pasar la cadena a hexadecimal y que sea un valor de dos dígitos
    const r = secureByte(rgbColor.r.toString(16));
    const g = secureByte(rgbColor.g.toString(16));
    const b = secureByte(rgbColor.b.toString(16));
    //concatenamos mode+r+g+b+constant
    const colorToWrite = mode.concat(r, g, b, "00f0aa");
    const data = conversor.hexToBytes(colorToWrite);
    const brightness = store.getState().brightness;

    data[1] = Math.round(data[1] * brightness);
    data[2] = Math.round(data[2] * brightness);
    data[3] = Math.round(data[3] * brightness);

    await BleManager.write(
      deviceInfo.id,
      deviceInfo.characteristics[3].service,
      deviceInfo.characteristics[3].characteristic,
      data
    )
      .then(() => {
        // Success code
        console.log("Writed: " + data);
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  }

  onLongPress = key => {
    const color = hsv2Hex(
      this.props.color.h,
      this.props.color.s,
      this.props.color.v
    );
    switch (key) {
      case 1:
        this.setState({ color1: color });
        break;
      case 2:
        this.setState({ color2: color });
        break;
      case 3:
        this.setState({ color3: color });
        break;
      case 4:
        this.setState({ color4: color });
        break;
    }
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
              this.handleColorChange(this.state.color1);
            }}
            onLongPress={() => {
              this.onLongPress(1);
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
              this.handleColorChange(this.state.color2);
            }}
            onLongPress={() => {
              this.onLongPress(2);
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
              this.handleColorChange(this.state.color3);
            }}
            onLongPress={() => {
              this.onLongPress(3);
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
              this.handleColorChange(this.state.color4);
            }}
            onLongPress={() => {
              this.onLongPress(4);
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
