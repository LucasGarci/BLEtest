import React from 'react';
import { StyleSheet, Text, View, NativeModules } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { createStackNavigator } from 'react-navigation';
import { BlueTest } from './BlueTest';


export class App extends React.Component {
  render() {
    return (
      <View>
        <BlueTest />
      </View>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      title: 'Devices Scanner',
    },
  },
});