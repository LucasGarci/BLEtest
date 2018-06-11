import React from "react"
import { TabNavigator, StackNavigator } from "react-navigation"
import { Text } from "react-native"
import { Icon } from "react-native-elements"

import { BlueTest } from "../BlueTest"
import { Example } from "../Example"
import { BriTab } from "../containers/BriTab"
import { ColorTab } from "../containers/ColorTab"
import { TempTab } from "../containers/TempTab"
import { EffectTab } from "../containers/EffectTab"
import { OptionsScreen } from "../containers/OptionsScreen"
import { DeviceTabs } from "../containers/DeviceTabs"
import { OptionsButton } from "../components/OptionsButton"



export const Root = StackNavigator({
  Home: {
    screen: Example,
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
  Brigthness: {
    screen: BriTab,
    navigationOptions: {
      tabBarLabel: <Icon
        name='brightness-6'
        color='white'
        size={32}
      />
    }
  },
  RGB: {
    screen: ColorTab,
    navigationOptions: {
      tabBarLabel: <Icon
      name='color-lens'
      color='white'
      size={32}
    />
    }
  },
  Temperature: {
    screen: TempTab,
    navigationOptions: {
      tabBarLabel: <Icon
      name='beach-access'
      color='white'
      size={32}
    />
    }
  },
  Effect: {
    screen: EffectTab,
    navigationOptions: {
      tabBarLabel: <Icon
      name='smoking-rooms'
      color='white'
      size={32}
    />
    }
  }
})
