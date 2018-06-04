import React, { Component } from 'react';
import { StyleSheet, AppRegistry, View, TouchableOpacity, Text } from 'react-native';

export class PrefabPicker extends Component {
    constructor() {
        super()
        this.state = {
            color1: "#aa6822",
            color2: "#006385",
            color3: "#fff",
            color4: "#ee0000",
            brigthness1: 100,
            brigthness2: 70,
            brigthness3: 9,
            brigthness4: 42,
        }
    }
    onPress = () => {
        console.log('Pulsado')
    }
    render() {
        return (
            <View style={{
                //flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={styles.pickerItem} >
                    <TouchableOpacity style= {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.state.color1}} onPress={this.onPress}>
                        <Text>{JSON.stringify(this.state.brigthness1)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pickerItem} >
                    <TouchableOpacity style= {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.state.color2}} onPress={this.onPress}>
                        <Text>{JSON.stringify(this.state.brigthness2)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pickerItem} >
                    <TouchableOpacity style= {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.state.color3}} onPress={this.onPress}>
                        <Text>{JSON.stringify(this.state.brigthness3)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pickerItem} >
                    <TouchableOpacity style= {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.state.color4}} onPress={this.onPress}>
                        <Text>{JSON.stringify(this.state.brigthness4)}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
};


const styles = StyleSheet.create({
    pickerItem: {
        width: 55,
        borderWidth: 1,
        borderRadius: 2,
        margin: 5,
        height: 55,
    },
    touchItem: {
        
    }
})