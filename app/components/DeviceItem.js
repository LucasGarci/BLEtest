import React from "react"
import {
  StyleSheet, Text, TouchableOpacity, NativeEventEmitter,
  NativeModules,
} from "react-native"
import { Card } from "react-native-elements"
import BleManager from "react-native-ble-manager"
import Buffer from "buffer"
import { bytesToString } from 'convert-string';

const BleManagerModule = NativeModules.BleManager
//We create our events emitter
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

var conversor = require("convert-hex")

// DONT DELETE THIS COMMENT https://www.npmjs.com/package/convert-hex

export class DeviceItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      name: null,
      rssi: null,
      connected: false,
      devices: new Map()
    }
    this.device = {}
    this.oldData = [
      76,
      69,
      68,
      66,
      76,
      69,
      45,
      55,
      56,
      54,
      50,
      57,
      66,
      52,
      51,
      0
    ]
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(
      this
    )
  }

  componentDidMount() {
    const { device } = this.props
    this.setState({
      id: device.id,
      name: device.name || "Anonimo",
      rssi: device.rssi,
      connected: device.connected
    })
    this.device = this.props.device
    this.handlerUpdate = bleManagerEmitter.addListener(
      "BleManagerDidUpdateValueForCharacteristic",
      this.handleUpdateValueForCharacteristic
    )
  }

  handleUpdateValueForCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  _onPress = () => {
    console.log({ props: this.props })
    const { device } = this.props
    if (device) {
      console.log("Connected to " + device.id)
      BleManager.connect(device.id)
        .then(() => {
          let devices = this.state.devices
          let p = devices.get(device.id)
          if (p) {
            p.connected = true
            devices.set(device.id, p)
            this.setState({ devices })
          }
          console.log("Connected to " + device.id)

          setTimeout(() => {
            BleManager.retrieveServices(device.id)
              .then(deviceInfo => {
                console.log({ deviceInfo })
                // Esta es la unica caracteristica que responde a startNotific...
                BleManager.startNotification(
                  deviceInfo.id,
                  deviceInfo.characteristics[4].service,
                  deviceInfo.characteristics[4].characteristic
                ).catch(errNotif => console.log({ errNotif }))
                console.log("lanzado device infos!")
                return deviceInfo
              })
              .then(async deviceInfo => {
                // BleManager.read(
                //   deviceInfo.id,
                //   deviceInfo.characteristics[0].service,
                //   deviceInfo.characteristics[0].characteristic
                // )
                //   .then(readData => {
                // Success code
                // console.log({ readData })
                // const buffer = Buffer.Buffer.from(readData)
                // console.log({ buffer })
                // const sensorData = buffer.readUInt8(1, true)
                // console.log({ sensorData })
                // Turn Off the Light
                await BleManager.createBond(deviceInfo.id)
                  .then(() => {
                    console.log(
                      "createBond success or there is already an existing one"
                    )
                  })
                  .catch(() => {
                    console.log("fail to bond")
                  })
                /*
                Red : 0x56ff000000f0aa
                Yellow : 0x56ffff0000f0aa,
                Blue: 0x560000ff00f0aa
                */
                const data = conversor.hexToBytes('0x56ffff0000f0aa')
                console.log({ dataToWrite: data })
                for (let index = 0; index < 4; index++) {
                  await BleManager.write(
                    deviceInfo.id,
                    deviceInfo.characteristics[3].service,
                    deviceInfo.characteristics[3].characteristic,
                    data
                  )
                    .then(() => {
                      // Success code
                      console.log("Writed: " + data)
                    })
                    .catch(error => {
                      // Failure code
                      console.log(error)
                    })
                }

                // })
                // .catch(error => {
                //   // Failure code
                //   console.log(error)
                // })
              })
          }, 900)
        })
        .catch(error => {
          console.log("Connection error", error)
        })
    }
    /*  BleManager.stopScan().then(() => {
      // Success code
      console.log("Scan stopped");
    });
   
    if (this.props.device.connected) {
      console.log("Device is connected");
      BleManager.retrieveServices(this.device.id)
        .then(deviceInfo => {
          // Success code
          console.log({
            DeviceInfo: deviceInfo
          });
          this.props.navigation.navigate("Device");
        })
        .catch(reason => console.log({ reason }));
      return;
    }
   
    BleManager.connect(this.device.id)
      .then(() => {
        // Success code
        console.log("Connected");
        this.props.navigation.navigate("Device");
      })
      .then(
        BleManager.retrieveServices(this.device.id)
          .then(deviceInfo => {
            // Success code
            console.log({
              DeviceInfo: deviceInfo
            });
          })
          .catch(reason => console.log({ reason }))
      )
      .catch(error => {
        // Failure code
        console.log(error);
      });
      */
  }

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
          <Text> Rssi: {this.state.rssi || 'Connected'} </Text>
        </Card>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 7,
    margin: 10,
    borderRadius: 10
  }
})
