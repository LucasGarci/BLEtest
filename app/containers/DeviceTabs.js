import React from "react"
import { ImageBackground } from "react-native";
import { DeviceNavigation } from "../navigation/router"

export class DeviceTabs extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require('../img/fondoapp.png')}
        style={{ width: '100%', height: '100%' }} >
        <DeviceNavigation />
      </ImageBackground>
    )
  }
}
