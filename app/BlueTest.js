import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-plx';


export class BlueTest extends React.Component {
    constructor() {
        super()
        this.state = {
            bleState: 'NOT READY',
            devicesIds: [],
            names: [],
            devicesData: []
        }
        this.manager = new BleManager();
        this.lastDevice = "No hay nada";

    }


    async componentDidMount() {
        const currentState = await this.manager.state()
        console.log({ currentState })
        this.setState({ bleState: currentState })

        const subscription = this.manager.onStateChange((state) => {
            this.scanAndConnect();
            subscription.remove();
        }, true);
    }

    scanAndConnect() {
        if (this.state.bleState !== 'PoweredOn') {
            return
        }

        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                return console.error(error)
            }
            // device.name
            // console.log(device)
            if (!this.state.devicesIds.includes(device.id)) {
                this.setState({ devicesIds: [device.id, ...this.state.devicesIds] });
                var newDevice = {};
                newDevice["name"] = device.name;
                newDevice["id"] = device.id;
                newDevice["rssi"] = device.rssi;
                console.log({ oldDeviceData: this.state.devicesData });
                this.setState({
                    devicesData: [...this.state.devicesData, newDevice]
                });
                console.log({ estadoActual: this.state });
            }
            if (!this.state.names.includes(device.name)) {
                this.setState({ names: [device.name, ...this.state.names] })
                console.log({ deviceIds: this.state.devicesIds })
            }
            if (this.state.devicesIds.length > 0) {
                this.lastDevice = this.state.devicesIds[this.state.devicesIds.length - 1];
            }
            // Si ha encontrado mi dispositvo dejamos de escanear
            if (device.name === 'nombre de mi dispositivo') {
                this.manager.stopDeviceScan();
            }

        });
    }

    resetDevices() {
        // Reseteamos los devices
        this.setState({ devicesIds: [] });
        this.setState({ names: [] });
    }

    render() {
        if (this.state.devicesIds.length > 0) {
            this.lastDevice = this.state.devicesIds[this.state.devicesIds.length - 1];
        }
        return (
            <View>
                <View>
                    <Button
                        // Propiedades del botón ("props")                    
                        title="Reset devices list"
                        onPress={() => { this.resetDevices() }}
                    ></Button>
                    <Text>BLE state= {JSON.stringify(this.state.bleState)}</Text>
                    <Text>devicesIds.length = {this.state.devicesIds.length}</Text>
                    <Text>names.length = {this.state.names.length}</Text>
                    <Text>LastDevice.id = {this.lastDevice}</Text>
                    <FlatList
                        data={this.state.devicesData}
                        renderItem={({ item }) => <Text>{item.id}</Text>}
                    />

                    
                </View>
            </View>
        )
    }
}