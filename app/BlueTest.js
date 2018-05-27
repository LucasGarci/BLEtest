import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

export class BlueTest extends React.Component {
    constructor() {
        super()
        this.state = { bleState: 'NOT READY', devicesIds: [], names: [] }
        this.manager = new BleManager();
        this.disp1 = "No hay nada";
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
            console.log(device)
            if (!this.state.devicesIds.includes(device.id)) {
                this.setState({ devicesIds: [device.id, ...this.state.devices] })
            }
            if (!this.state.names.includes(device.name)) {
                this.setState({ names: [device.name, ...this.state.names] })
                console.log({polla: this.state.names})
            }
            if (this.state.devicesIds.length > 0) {
                this.disp1 = this.state.devicesIds[this.state.devicesIds.length - 1].name;
            }
            // Si ha encontrado mi dispositvo dejamos de escanear
            if (device.name === 'nombre de mi dispositivo') {
                this.manager.stopDeviceScan();
            }
            
        });
    }

    resetDevices() {
        // Reseteamos los devices
        this.setState({devicesIds: []});
        this.setState({names: []});
    }

    render() {
        return (
            <View>
                <View>
                    <Text>BLE state= {JSON.stringify(this.state.bleState)}</Text>
                    <Text>devices.length = {this.state.devicesIds.length}</Text>
                    <Text>names.length = {this.state.names.length}</Text>
                    <Text>device.name = {this.disp1}</Text>

                    <Button
                        // Propiedades del botón ("props")                    
                        title="Reset devices list"
                        onPress={() => { this.resetDevices() }}
                    ></Button>
                </View>          
            </View>
        )
    }
}