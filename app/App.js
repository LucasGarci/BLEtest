import React from 'react';
import { StyleSheet, Button, Text, View, NativeModules } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { BlueTest } from './BlueTest';
import { DeviceTabScreen } from './DeviceTabScreen'
import { createStackNavigator } from 'react-navigation';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}

class DeviceScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Device Tab Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

export const Navi = createStackNavigator(
  {
    Scanner: BlueTest,
    Settings: SettingsScreen,
    Device: DeviceTabScreen,
  },
  {
    initialRouteName: 'Scanner',
  }
);

export default class App extends React.Component {
  render() {
    return <Navi />;
  }
}