import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import BleManager from "react-native-ble-manager";
import Buffer from 'buffer';

export class DeviceItem extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: null,
      rssi: null,
      connected: false,
      peripherals: new Map()
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
  }

  _onPress = () => {

    //ESTO ES PARA PRUEBAS
    this.props.navigation.navigate("Device");


    const peripheral = this.props.device;
    if (peripheral) {
      console.log("Connected to " + peripheral.id);
      if (peripheral.connected) {
        BleManager.disconnect(peripheral.id);
      } else {
        BleManager.connect(peripheral.id)
          .then(() => {
            let peripherals = this.state.peripherals;
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              peripherals.set(peripheral.id, p);
              this.setState({ peripherals });
            }
            console.log("Connected to " + peripheral.id);

            setTimeout(() => {
              BleManager.retrieveServices(peripheral.id)
                .then(peripheralInfo => {
                  console.log({ peripheralInfo });
                  BleManager.startNotification(
                    peripheralInfo.id,
                    peripheralInfo.characteristics[0].service,
                    peripheralInfo.characteristics[0].characteristic
                  );
                  console.log("lanzado peripheral infos!");
                  return peripheralInfo;
                })
                .then(peripheralInfo => {
                  BleManager.read(
                    peripheralInfo.id,
                    peripheralInfo.characteristics[0].service,
                    peripheralInfo.characteristics[0].characteristic
                  )
                    .then(readData => {
                      // Success code
                      console.log({readData});
                      const buffer = Buffer.Buffer.from(readData);
                      console.log({ buffer });
                      const sensorData = buffer.readUInt8(1, true);
                      console.log({ sensorData });
                    })
                    .catch(error => {
                      // Failure code
                      console.log(error);
                    });
                });
            }, 900);
          })
          .catch(error => {
            console.log("Connection error", error);
          });
      }
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
          <Text> Rssi: {this.state.rssi} </Text>
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
