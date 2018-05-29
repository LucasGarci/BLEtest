import React from 'react';
import { StyleSheet, Text, View, NativeModules } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { BlueTest } from './app/BlueTest';

export default class App extends React.Component {

  render() {
    return (
      <View>
        <BlueTest />
      </View>
    );
  }
}