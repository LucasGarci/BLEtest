import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import BleManager from "react-native-ble-manager";

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
      connected: device.connected,
    });
    this.device = this.props.device;
  }

  _onPress = () => {
    const peripheral = this.props.device
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
              /* Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);
              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
              });
            });*/

              // Test using bleno's pizza example
              // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
              BleManager.retrieveServices(peripheral.id).then(
                peripheralInfo => {
                  console.log({peripheralInfo});
                  var service = "13333333-3333-3333-3333-333333333337";
                  var bakeCharacteristic =
                    "13333333-3333-3333-3333-333333330003";
                  var crustCharacteristic =
                    "13333333-3333-3333-3333-333333330001";

                  setTimeout(() => {
                    BleManager.startNotification(
                      peripheral.id,
                      service,
                      bakeCharacteristic
                    )
                      .then(() => {
                        console.log("Started notification on " + peripheral.id);
                        setTimeout(() => {
                          BleManager.write(
                            peripheral.id,
                            service,
                            crustCharacteristic,
                            [0]
                          ).then(() => {
                            console.log("Writed NORMAL crust");
                            BleManager.write(
                              peripheral.id,
                              service,
                              bakeCharacteristic,
                              [1, 95]
                            ).then(() => {
                              console.log(
                                "Writed 351 temperature, the pizza should be BAKED"
                              );
                              /*
                        var PizzaBakeResult = {
                          HALF_BAKED: 0,
                          BAKED:      1,
                          CRISPY:     2,
                          BURNT:      3,
                          ON_FIRE:    4
                        };*/
                            });
                          });
                        }, 500);
                      })
                      .catch(error => {
                        console.log("Notification error", error);
                      });
                  }, 200);
                }
              );
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
