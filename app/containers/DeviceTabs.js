import React from "react";
import { View } from "react-native";
import { DeviceNavigation } from "../navigation/router";
import { theme } from "../assets/colorThemes";

export class DeviceTabs extends React.Component {
  render() {
    const { navigation } = this.props;
    const device = navigation.getParam("device", "NOT FOUND");
    console.log({ deviceInDeviceTabs: device });
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: theme().bgColor
        }}
      >
        <DeviceNavigation device={device} />
      </View>
    );
  }
}
