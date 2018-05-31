import React from 'react';
import { StyleSheet, Button, Text, View, NativeModules } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { BlueTest } from './BlueTest';
import { createStackNavigator } from 'react-navigation';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { withNavigation } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Text>!</Text>
        <Button
          title="Go to BlueTest"
          onPress={() => this.props.navigation.navigate('BlueTest')}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },
    BlueTest: { screen: BlueTest },
  },
  {
    navigationOptions: ({ navigation }) => ({
      // AQuí iban los iconos que no me funkaban :(
    }),
    tabBarComponent: TabBarBottom,
     // Las pestañas en top para que no las tapen los Warnings*
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
