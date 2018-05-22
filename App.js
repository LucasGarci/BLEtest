import React from 'react';
import { StyleSheet, Text, View, NativeModules } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { BlueTest } from './src/BlueTest';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <BlueTest />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
