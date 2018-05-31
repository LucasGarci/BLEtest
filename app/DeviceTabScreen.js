import React from 'react';
import { StyleSheet, Button, Text, View, NativeModules } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { BlueTest } from './BlueTest';
import { createStackNavigator } from 'react-navigation';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { withNavigation } from 'react-navigation';

class RgbTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>RGB TAB!</Text>
        <Button
          title="Go to HOT COLD"
          onPress={() => this.props.navigation.navigate('Hot')}
        />
        <Text>!</Text>
        <Button
          title="Go to Scanner"
          onPress={() => this.props.navigation.navigate('BlueTest')}
        />
      </View>
    );
  }
}

class HotColdTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>HOT COLD TAB!</Text>
        <Button
          title="Go to Rgb"
          onPress={() => this.props.navigation.navigate('Rgb')}
        />
      </View>
    );
  }
}



export default TabNavigator(
  {
    Rgb: { screen: RgbTab },
    Hot: { screen: HotColdTab },
  },
  /*{
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
  }*/
);


export  class DeviceTabScreen extends React.Component {
  render() {
    return TabNavigator.navigate('Settings');
  }
}