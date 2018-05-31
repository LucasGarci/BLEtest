import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { DeviceItem } from "./components/DeviceItem";
import { createStackNavigator } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import { DeviceTabScreen } from './DeviceTabScreen';



export class BlueTest extends React.Component {
  constructor() {
    super();
    this.state = {
      bleState: "NOT READY",
      devicesIds: [],
      names: [],
      devicesData: []
    };
    this.manager = new BleManager();
    this.isDiscovering = false;
  }

  async componentDidMount() {
    const bluetoothState = await this.manager.state();
    console.log({ bluetoothState });
    this.setState({ bleState: bluetoothState });
  }

  scanAndConnect() {
    if (this.state.bleState !== "PoweredOn") {
      return;
    }

    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return console.error(error);
      }
      //Comprobamos que el dispositivo no ha sido encontrado anteriormente
      if (!this.state.devicesIds.includes(device.id)) {
        this.setState({ devicesIds: [device.id, ...this.state.devicesIds] });
        // Añadimos el dispositivo completo a la lista
        this.setState({
          devicesData: [...this.state.devicesData, device]
        });
        console.log({ estadoActual: this.state });
      }
    });
  }

  resetDevices() {
    // Reseteamos los devices y los ids
    this.setState({ devicesIds: [] });
    this.setState({ devicesData: [] });
  }

  startStop() {
    // Limpiamos y empezamos nuevo escaner o detenemos el actual
    if (this.state.isDiscovering) {
      console.log("Stoped scanner");
      this.manager.stopDeviceScan();
      this.setState({ isDiscovering: false });
    } else {
      console.log("Starting scanner");
      const subscription = this.manager.onStateChange(state => {
        this.scanAndConnect();
        subscription.remove();
      }, true);
      this.setState({ isDiscovering: true });
      this.resetDevices();
    }
  }

  render() {
    return (
      <View>
        <View>
          <Button
            // Botón de prueba del navigator
            title="Go to Inicio"
            onPress={() => this.props.navigation.navigate('Device')}
          />
          <Text>-------------------------------->>>></Text>
          <Button
            // Botón de prueba del navigator
            title="Go to Settings"
            onPress={() => this.props.navigation.navigate('Details')}
          />
          <Text>-------------------------------->>>></Text>
          <Button
            // Propiedades del botón ("props")
            title={this.state.isDiscovering ? "Stop scanner" : "Start new scan"}
            onPress={() => {
              this.startStop();
            }}
          />
          <View style={styles.container}>
            <Text>BLE state: {JSON.stringify(this.state.bleState)}</Text>
            <Text>Devices found: {this.state.devicesIds.length}</Text>
            <FlatList
              // Le pasamos el array de dispositivos de nuetro estado
              data={this.state.devicesData}
              renderItem={({ item }) => <DeviceItem device={item} />}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 9,
    borderRadius: 9,
    borderColor: "#d6d7da"
  }
});