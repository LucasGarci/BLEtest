import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  FlatList,
  AppRegistry,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ListView,
  AppState,
  Dimensions
} from "react-native";
import I18n from "react-native-i18n";
import { Card, Icon } from "react-native-elements";
import BleManager from "react-native-ble-manager";
import { DeviceItem } from "./components/DeviceItem";
import { connect } from "react-redux";
import { store } from "./redux/store";
import { theme } from "./assets/colorThemes";

//We get the class to subscribe
const BleManagerModule = NativeModules.BleManager;
//We create our events emitter
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

@connect(state => {
  return {
    language: state.language,
    theme: state.theme
  };
})
export class Scanner extends React.Component {
  constructor() {
    super();
    this.state = {
      scanning: false,
      bleState: "",
      appState: "",
      devicesIds: [],
      devices: [],
      devicesConnectedIds: [],
      devicesConnected: []
    };
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
  }

  handleDiscoverPeripheral(device) {
    if (!this.state.devicesIds.includes(device.id)) {
      console.log({ DeviceFound: device });
      this.setState({ devicesIds: [...this.state.devicesIds, device.id] });
      // Añadimos el dispositivo completo a la lista
      this.setState({
        devices: [...this.state.devices, device]
      });
    }
  }

  componentWillUnmount() {
    BleManager.stopScan().then(() => {
      // Success code
      console.log("Scan stopped on Unmount");
    });
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
  }

  componentDidMount() {
    // We set listeners to our events to our api events
    this.setListeners();
    //Comprobamos el BLE (nos pide permisos) y lo arrancamos
    startManager();
    //Actualizamos los dispositivos conectados
    this.retrieveConnected();
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      console.log({ ConnectedDevices: results });
      for (var i = 0; i < results.length; i++) {
        var device = results[i];
        device.connected = true;
        this.setState({ devicesConnected: results });
      }
    });
  }

  resetDevices() {
    // Reseteamos los devices y los ids
    this.setState({ devicesIds: [] });
    this.setState({ devices: [] });
    this.setState({ devicesConnectedIds: [] });
    this.setState({ devicesConnected: [] });
  }

  startStop() {
    // Limpiamos y empezamos nuevo escaner o detenemos el actual
    if (this.state.scanning) {
      console.log("Stoped scanner");
      BleManager.stopScan().then(() => {
        // Success code
        console.log("Scan stopped");
      });
      this.setState({ scanning: false });
    } else {
      BleManager.scan([], 5, true).then(console.log("Scan started"));
      this.setState({ scanning: true });
      this.resetDevices();
    }
    this.retrieveConnected();
  }

  setListeners = () => {
    this.handlerDiscover = bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      this.handleDiscoverPeripheral
    );
  };

  render() {
    const stop = I18n.t("stop");
    const start = I18n.t("start");
    return (
      <View style={{ backgroundColor: theme().bgColor, flex: 1 }}>
        <View>
          <View style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Button
              color={theme().buttonColor}
              title={this.state.scanning ? stop : start}
              onPress={() => {
                this.startStop();
              }}
            />
          </View>

          {this.state.devicesConnected.length > 0 ? (
            <Card
              containerStyle={[
                styles.titles,
                {
                  backgroundColor: theme().bgLightColor
                }
              ]}
            >
              <Text style={[{ fontSize: 18 }, { color: theme().textColor }]}>
                {I18n.t("connected")} {this.state.devicesConnected.length}
              </Text>
            </Card>
          ) : null}
          <View>
            <ScrollView style={styles.container}>
              <FlatList
                // Recogemos el array de dispositivos conectados de nuetro estado
                data={this.state.devicesConnected}
                renderItem={({ item }) => (
                  <DeviceItem
                    device={item}
                    navigation={this.props.navigation}
                    parent={this}
                  />
                )}
              />
            </ScrollView>
          </View>

          <Card
            containerStyle={[
              styles.titles,
              {
                backgroundColor: theme().bgLightColor
              }
            ]}
          >
            <Text style={[{ fontSize: 18 }, { color: theme().textColor }]}>
              {I18n.t("found")} {this.state.devicesIds.length}
            </Text>
          </Card>
          <View>
            <ScrollView style={styles.container}>
              <FlatList
                // Recogemos el array de dispositivos encontrados de nuetro estado
                data={this.state.devices}
                renderItem={({ item }) => (
                  <DeviceItem
                    device={item}
                    navigation={this.props.navigation}
                    parent={this}
                  />
                )}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    borderColor: "#d6d7da"
  },
  titles: {
    margin: 0,
    marginLeft: -3,
    marginRight: -3,
    padding: 5,
    paddingLeft: 15
  }
});

startManager = () => {
  BleManager.enableBluetooth()
    .then(() => {
      // Success code
      console.log("The bluetooth is already enabled or the user confirm");
    })
    .catch(error => {
      // Failure code
      console.warn({ error });
      console.log("The user refuse to enable bluetooth");
    });
  BleManager.start();
};
