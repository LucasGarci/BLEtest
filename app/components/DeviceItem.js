import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  NativeEventEmitter,
  NativeModules
} from "react-native";
import { Card } from "react-native-elements";
import BleManager from "react-native-ble-manager";
import I18n from '../../I18n/I18n';
import Buffer from "buffer";
import { bytesToString } from "convert-string";

const BleManagerModule = NativeModules.BleManager;
//We create our events emitter
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

var conversor = require("convert-hex");

// DONT DELETE THIS COMMENT https://www.npmjs.com/package/convert-hex

export class DeviceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      rssi: null,
      connected: false,
      devices: new Map()
    };
    this.device = {};
  }

  componentDidMount() {
    const { device } = this.props;
    this.setState({
      id: device.id,
      name: device.name || "Anonimo",
      rssi: device.rssi,
      connected: device.connected
    });
    this.device = this.props.device;
    this.handlerUpdate = bleManagerEmitter.addListener(
      "BleManagerDidUpdateValueForCharacteristic",
      this.handleUpdateValueForCharacteristic
    );
  }

  _onPress = async () => {
    const { device } = this.props;
    await BleManager.connect(device.id)
      .then(() => {
        let devices = this.state.devices;
        let p = devices.get(device.id);
        if (p) {
          p.connected = true;
          devices.set(device.id, p);
          this.setState({ devices });
        }
        console.log("Connected to " + device.id);
        this.props.navigation.navigate("Device", {
          device: this.props.device
        });
      })
      .catch(error => {
        console.log("Connection error", error);
      });

    await BleManager.connect(device.id)
      .then(() => {
        let devices = this.state.devices;
        let p = devices.get(device.id);
        if (p) {
          p.connected = true;
          devices.set(device.id, p);
          this.setState({ devices });
        }
        console.log("Connected to " + device.id);
      })
      .catch(error => {
        console.log("Connection error", error);
      });
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          padding: 1
        }}
        onPress={this._onPress}
      >
        <Card containerStyle={styles.list}>
          <Text> Id: {this.state.id} </Text>
          <Text> {I18n.t('name')} {this.state.name} </Text>
          <Text> Rssi: {this.state.rssi || "Connected"} </Text>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 7,
    margin: 10,
    borderRadius: 10
  }
});
