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
    await BleManager.retrieveServices(device.id)
      .then(deviceInfo => {
        console.log({ deviceInfo });
        // Esta es la unica caracteristica que responde a startNotific...
        /* BleManager.startNotification(
          deviceInfo.id,
          deviceInfo.characteristics[4].service,
          deviceInfo.characteristics[4].characteristic
        ).catch(errNotif => console.log({ errNotif }));*/
        return deviceInfo;
      })
      .then(async deviceInfo => {
        for (
          let index = 0;
          index < deviceInfo.characteristics.length;
          index++
        ) {
          console.log("ciclo", index);
          await BleManager.read(
            deviceInfo.id,
            deviceInfo.characteristics[index].service,
            deviceInfo.characteristics[index].characteristic
          )
            .then(readData => {
              console.log({ readData });
              const buffer = Buffer.Buffer.from(readData);
              console.log({ bufferData });
              const sensorData = buffer.readUInt8(1, true);
              console.log({ sensorData });
            })
            .catch(err => console.log({ devInfErr: err }));
        }
      });
    /*
    const { device } = this.props
    if (device) {
      await BleManager.connect(device.id)
        .then(() => {
          let devices = this.state.devices
          let p = devices.get(device.id)
          if (p) {
            p.connected = true
            devices.set(device.id, p)
            this.setState({ devices })
          }
          console.log("Connected to " + device.id)
        })
        .catch(error => {
          console.log("Connection error", error)
        })
      await BleManager.retrieveServices(device.id)
        .then(deviceInfo => {
          console.log({ deviceInfo })
          // Esta es la unica caracteristica que responde a startNotific...
          BleManager.startNotification(
            deviceInfo.id,
            deviceInfo.characteristics[4].service,
            deviceInfo.characteristics[4].characteristic
          ).catch(errNotif => console.log({ errNotif }))
          return deviceInfo
        })
        .then(async deviceInfo => {
          await BleManager.read(
            deviceInfo.id,
            deviceInfo.characteristics[0].service,
            deviceInfo.characteristics[0].characteristic
          )
            .then(readData => {
              console.log({ readData })
              const buffer = Buffer.Buffer.from(readData)
              console.log({ buffer })
              const sensorData = buffer.readUInt8(1, true)
              console.log({ sensorData })
            }).catch(err => console.log({ devInfErr: err }))

          await BleManager.createBond(deviceInfo.id)
            .then(() => {
              console.log(
                "createBond success or there is already an existing one"
              )
            })
            .catch(() => {
              console.log("fail to bond")
            })

          const rgb = {
            r: '0x56ff000000f0aa',
            g: '0x5600ff0000f0aa',
            b: '0x560000ff00f0aa',
          }

          const data = conversor.hexToBytes('0x5620202000f0aa')
          console.log({ dataToWrite: data })
          for (let index = 0; index < 60; index++) {
            await BleManager.write(
              deviceInfo.id,
              deviceInfo.characteristics[3].service,
              deviceInfo.characteristics[3].characteristic,
              data
            )
              .then(() => {
                index = 60
                // Success code
                console.log("Writed: " + data)
              })
              .catch(error => {
                // Failure code
                console.log(error)
              })
          }
        })
    }*/
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
          <Text> Name: {this.state.name} </Text>
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
