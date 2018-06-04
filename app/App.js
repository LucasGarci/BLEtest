import React from "react"
import { StyleSheet, Text, View, NativeModules } from "react-native"
import { BleManager } from "react-native-ble-plx"
import { createStackNavigator } from "react-navigation"
import { Root } from "./navigation/router"

class App extends React.Component {
  render() {
    return (
        <Root />
    )
  }
}
export default App
