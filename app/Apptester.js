import React from 'react';
import { StyleSheet, Button, Text, View, NativeModules } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { BlueTest } from './BlueTest';
import { createStackNavigator } from 'react-navigation';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

class InicioScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const Navi = createStackNavigator(
  {
    Home: BlueTest,
    Details: DetailsScreen,
    Inicio: InicioScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Navi />
      </View>
    );
  }
}