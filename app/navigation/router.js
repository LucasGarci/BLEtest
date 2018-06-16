import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Text } from "react-native";
import { Icon } from "react-native-elements";

import { Scanner } from "../Scanner";
import { BriTab } from "../containers/BriTab";
import { ColorTab } from "../containers/ColorTab";
import { TempTab } from "../containers/TempTab";
import { EffectTab } from "../containers/EffectTab";
import { OptionsScreen } from "../containers/OptionsScreen";
import { DeviceTabs } from "../containers/DeviceTabs";
import { OptionsButton } from "../components/OptionsButton";
import I18n from '../../I18n/I18n';

export const Root = StackNavigator({
  Home: {
    screen: Scanner,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('scanner'),
      headerRight: <OptionsButton navigation={navigation} />
    })
  },
  Options: {
    screen: OptionsScreen,
    navigationOptions: {
      title: I18n.t('settings')
    }
  },
  Device: {
    screen: DeviceTabs,
    navigationOptions: {
      title: I18n.t('controller')
    }
  }
});

export const DeviceNavigation = TabNavigator({
  Brigthness: {
    screen: BriTab,
    navigationOptions: {
      tabBarLabel: <Icon name="brightness-6" color="white" size={32} />
    }
  },
  RGB: {
    screen: ColorTab,
    navigationOptions: {
      tabBarLabel: <Icon name="color-lens" color="white" size={32} />
    }
  },
  Temperature: {
    screen: TempTab,
    navigationOptions: {
      tabBarLabel: <Icon name="beach-access" color="white" size={32} />
    }
  },
  Effect: {
    screen: EffectTab,
    navigationOptions: {
      tabBarLabel: <Icon name="3d-rotation" color="white" size={32} />
    }
  }
});
