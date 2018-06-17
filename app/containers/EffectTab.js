import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import I18n from "../../I18n/I18n";
import { theme } from "../assets/colorThemes";

export class EffectTab extends React.Component {

  render() {

    return (
      <View style={styles.centerContainer}>
        <Text style={[{ fontSize: 18 }, { color: theme().textColor }]}>{I18n.t("comming_soon")}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 25
  }
});
