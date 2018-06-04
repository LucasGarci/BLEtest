import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Root } from "../navigation/router"


export class DeviceItem extends React.Component {
    constructor() {
        super()
        this.state = {
            id: null,
            name: null,
            rssi: null,
            isConnectable: null,
        }
        this.manager = new BleManager();
        this.device = {}
    }

    componentDidMount() {
        const { device } = this.props
        this.setState({
            id: device.id,
            name: device.name || 'Anonimo',
            rssi: device.rssi,
            isConnectable: device.isConnectable,
        })
        this.device = this.props.device;
    }

    onPress = () => {
        this.props.navigation.navigate("Device")
        /*this.manager.connectToDevice(this.state.id)
            .then((device) => {
                device.discoverAllServicesAndCharacteristics().then((result) => {
                    console.log({ fullData: result })
                })
            })
            .catch((reason) => {
                console.log({ result: reason }); // Error!
            })
        */
    };

    render() {
        return (
            <TouchableOpacity style={styles.list} onPress={this.onPress}>
                <View>
                    <Text>
                        Id: {this.state.id}
                    </Text>
                    <Text>
                        Name: {this.state.name}
                    </Text>
                    <Text>
                        Rssi: {this.state.rssi}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        margin: 1,
        padding: 2,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#505050',
    },
})