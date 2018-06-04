import React from "react"
import { TabNavigator, StackNavigator } from "react-navigation"
import { Text } from "react-native"

import { BlueTest } from "../BlueTest"
import { ColorTab } from "../containers/ColorTab"
import { TempTab } from "../containers/TempTab"
import { EffectTab } from "../containers/EffectTab"
import { OptionsScreen } from "../containers/OptionsScreen"
import { DeviceTabs } from "../containers/DeviceTabs"
import { OptionsButton } from "../components/OptionsButton"


export const Root = StackNavigator({
  Feed: {
    screen: BlueTest,
    navigationOptions: ({ navigation }) => ({
      title: "Bluetooth Scanner",
      headerRight: <OptionsButton navigation={navigation} />
    })
  },
  Options: {
    screen: OptionsScreen,
    navigationOptions: {
      title: "Options"
    }
  },
  Device: {
    screen: DeviceTabs,
    navigationOptions: {
      title: "Device Controller"
    }
  }
})

export const DeviceNavigation = TabNavigator({
  RGB: {
    screen: ColorTab,
    navigationOptions: {
      tabBarLabel: "RGB"
    }
  },
  Temperature: {
    screen: TempTab,
    navigationOptions: {
      tabBarLabel: "Temp"
    }
  },
  Effect: {
    screen: EffectTab,
    navigationOptions: {
      tabBarLabel: "Effect"
    }
  }
})
/*
export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: "Feed",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="list" size={35} color={tintColor} />
      )
    }
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: "Me",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="account-circle" size={35} color={tintColor} />
      )
    }
  }
})
*/
