import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export class DeviceItem extends React.Component {
    constructor() {
        super()
        this.state = {
            id: null,
            name: null,
            rssi: null,
            isConnectable: null,
        }
    }

    componentDidMount () {
        const {device} = this.props
        this.setState({
            id: device.id,
            name: device.name,
            rssi: device.rssi,
            isConnectable: device.isConnectable,
        })
    }

    onPress = () => {
        console.log(this.state.id);
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