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
    Dimensions,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { DeviceItem } from "./components/DeviceItem"

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export class Scanner extends React.Component {
    constructor() {
        super()
        this.state = {
            scanning: false,
            bleState: " ",
            appState: " ",
            devicesIds: [],
            devices: []
        }
        this.isDiscovering = false

        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    handleDiscoverPeripheral(device) {
        
        var devices = this.state.devices;
        if (!this.state.devicesIds.includes(device.id)) {
            console.log(device)
            this.setState({ devicesIds: [...this.state.devicesIds, device.id] });
            // Añadimos el dispositivo completo a la lista
            this.setState({
                devices: [...this.state.devices, device]
            });
        }
    }

    handleAppStateChange() {
    }

    componentWillUnmount() {
        this.handlerDiscover.remove();
        this.handlerStop.remove();
        this.handlerDisconnect.remove();
        this.handlerUpdate.remove();
    }

    handleDisconnectedPeripheral() {
    }

    handleUpdateValueForCharacteristic() {
    }

    handleStopScan() { }

    componentDidMount() {
        
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);
        BleManager.start();
    }

    resetDevices() {
        // Reseteamos los devices y los ids
        this.setState({ devicesIds: [] })
        this.setState({ devices: [] })
    }

    startStop() {
        // Limpiamos y empezamos nuevo escaner o detenemos el actual
        if (this.state.isDiscovering) {
            console.log("Stoped scanner")

            this.setState({ isDiscovering: false })
        } else {
            BleManager.scan([], 5, false)
                .then((result) => {
                    console.log({ result });
                    console.log('Scan started');
                });
            this.setState({ isDiscovering: true })
            this.resetDevices()
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('./img/fondoapp.png')}
                style={{ width: '100%', height: '100%' }} >
                <View>
                    <View>
                        <Button
                            // Propiedades del botón ("props")
                            title={this.state.isDiscovering ? "Stop scanner" : "Start new scan"}
                            onPress={() => {
                                this.startStop()
                            }}
                        />
                        <ScrollView style={styles.container}>
                            <Text>Nº Devices found: {this.state.devicesIds.length}</Text>
                            <FlatList
                                // Le pasamos el array de dispositivos de nuetro estado
                                data={this.state.devices}
                                renderItem={({ item }) => (
                                    <DeviceItem device={item} navigation={this.props.navigation} />
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
