import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { BleManager } from 'react-native-ble-plx';


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
    }

    componentDidMount () {
        const {device} = this.props
        this.setState({
            id: device.id,
            name: device.name || 'anonimo',  
            rssi: device.rssi,
            isConnectable: device.isConnectable,
        })
    }

    onPress = () => {
        this.manager.connectToDevice(this.state.id).then(function(value) {
            console.log({result: value}); // Success!
          }, function(reason) {
            console.log({result: reason}); // Error!
          });
    };

    render() {
        
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View>
                    <Text>
                        {this.state.id}
                    </Text>
                    <Text>
                        {this.state.name}
                    </Text>
                    <Text>
                        {this.state.rssi}
                    </Text>
                    <Text>
                        {this.state.isConnectable}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}