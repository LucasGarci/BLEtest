import React from "react";
import { ImageBackground } from "react-native";
import { DeviceNavigation } from "../navigation/router";
import I18n from '../../I18n/I18n';

export class DeviceTabs extends React.Component {
  render() {
    const { navigation } = this.props;
    const device = navigation.getParam("device", "NOT FOUND");
    console.log({ deviceInDeviceTabs: device });
    return (
      <ImageBackground
        source={require("../img/fondoapp.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <DeviceNavigation device={device} />
      </ImageBackground>
    );
  }
}
