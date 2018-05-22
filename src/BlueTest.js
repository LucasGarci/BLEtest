import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

export class BlueTest extends React.Component {
    constructor() {
        super()
        this.state = { bleState: 'NOT READY', devices: [], names: [] }
        this.manager = new BleManager();
        this.devNames = "dispositivo random";
        this.disp1 = "No hay nada";
    }


    async componentDidMount() {


        const bleState = await this.manager.state()
        console.log({ bleState })
        this.setState({ bleState })
        //manager.startDeviceScan();

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
            if (!this.state.devices.includes(device)) {
                this.setState({ devices: [device, ...this.state.devices] })
            }
            if (!this.state.names.includes(device.name)) {
                this.setState({ names: [device.name, ...this.state.names] })
            }
            if (this.state.devices.length > 0) {
                this.disp1 = this.state.devices[this.state.devices.length - 1].name;
            }
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name === 'TI BLE Sensor Tag' ||
                device.name === 'asd') {

                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();

                // Proceed with connection.
            }
        });
    }

    resetDevices() {

        this.state.devices = [];
    }

    render() {
        return (
            <View>
                <View>
                    <Text>BLE state= {JSON.stringify(this.state.bleState)}</Text>
                    <Text>devices.length = {this.state.devices.length}</Text>
                    <Text>names.length = {this.state.names.length}</Text>
                    <Text>device.name = {this.disp1}</Text>

                    <Button
                        title="Reset devices list"
                        onPress={() => { this.resetDevices() }}
                    ></Button>
                </View>
                <View>

                </View>
            </View>

        )
    }
}