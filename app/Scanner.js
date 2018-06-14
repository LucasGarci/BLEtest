import React from "react"
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
} from "react-native"
import I18n from 'react-native-i18n';
import BleManager from "react-native-ble-manager"
import { DeviceItem } from "./components/DeviceItem"

//We get the class to subscribe
const BleManagerModule = NativeModules.BleManager
//We create our events emitter
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

export class Scanner extends React.Component {
  constructor() {
    super()
    this.state = {
      scanning: false,
      bleState: "",
      appState: "",
      devicesIds: [],
      devices: [],
      devicesConnectedIds: [],
      devicesConnected: []
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this)
    this.handleStopScan = this.handleStopScan.bind(this)
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(
      this
    )
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(
      this
    )
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }

  handleDiscoverPeripheral(device) {
    if (!this.state.devicesIds.includes(device.id)) {
      console.log({DeviceFound: device})
      this.setState({ devicesIds: [...this.state.devicesIds, device.id] })
      // Añadimos el dispositivo completo a la lista
      this.setState({
        devices: [...this.state.devices, device]
      })
    }
  }

  handleAppStateChange() { }

  componentWillUnmount() {
    BleManager.stopScan().then(() => {
      // Success code
      console.log("Scan stopped on Unmount")
    })
    this.handlerDiscover.remove()
    this.handlerStop.remove()
    this.handlerDisconnect.remove()
    this.handlerUpdate.remove()
  }

  handleDisconnectedPeripheral() { }

  handleUpdateValueForCharacteristic() { }

  handleStopScan() { }

  componentDidMount() {
    // We set listeners to our events to our api events
    this.setListeners();
    //Comprobamos el BLE (nos pide permisos) y lo arrancamos
    startManager()
    //Actualizamos los dispositivos conectados
    this.retrieveConnected()
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      console.log({ ConnectedDevices: results })
      for (var i = 0; i < results.length; i++) {
        var device = results[i]
        device.connected = true
        this.setState({ devicesConnected: results })
      }
    })
  }

  resetDevices() {
    // Reseteamos los devices y los ids
    this.setState({ devicesIds: [] })
    this.setState({ devices: [] })
    this.setState({ devicesConnectedIds: [] })
    this.setState({ devicesConnected: [] })
  }

  startStop() {
    // Limpiamos y empezamos nuevo escaner o detenemos el actual
    if (this.state.scanning) {
      console.log("Stoped scanner")
      BleManager.stopScan().then(() => {
        // Success code
        console.log("Scan stopped")
      })
      this.setState({ scanning: false })
    } else {
      BleManager.scan([], 5, true).then(
        console.log("Scan started")
      )
      this.setState({ scanning: true })
      this.resetDevices()
    }
    this.retrieveConnected()
  }

  setListeners = () => {
    this.handlerDiscover = bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      this.handleDiscoverPeripheral
    )
    this.handlerStop = bleManagerEmitter.addListener(
      "BleManagerStopScan",
      this.handleStopScan
    )
    this.handlerDisconnect = bleManagerEmitter.addListener(
      "BleManagerDisconnectPeripheral",
      this.handleDisconnectedPeripheral
    )
    this.handlerUpdate = bleManagerEmitter.addListener(
      "BleManagerDidUpdateValueForCharacteristic",
      this.handleUpdateValueForCharacteristic
    )
  }

  render() {
    return (
      <ImageBackground
        source={require("./img/fondoapp.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View>
          <View>
            <Button
              // Propiedades del botón ("props")
              title={this.state.scanning ? "Stop scanner" : "Start new scan"}
              onPress={() => {
                this.startStop()
              }}
            />
            <ScrollView style={styles.container}>
              <Text>
                Nº Dispositivos Conectados: {this.state.devicesConnected.length}
              </Text>
              <FlatList
                // Le pasamos el array de dispositivos de nuetro estado
                data={this.state.devicesConnected}
                renderItem={({ item }) => (
                  <DeviceItem
                    device={item}
                    navigation={this.props.navigation}
                    parent={this}
                  />
                )}
              />
              <Text>
              Nº Dispositivos Encontrados: {this.state.devicesIds.length}
              </Text>
              <FlatList
                // Le pasamos el array de dispositivos de nuetro estado
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
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderColor: "#d6d7da"
  }
})

startManager = () => {
  BleManager.enableBluetooth()
    .then(() => {
      // Success code
      console.log("The bluetooth is already enabled or the user confirm")
    })
    .catch(error => {
      // Failure code
      console.warn({ error })
      console.log("The user refuse to enable bluetooth")
    })
  BleManager.start()
}