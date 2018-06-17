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
  onPress = () => {
    console.log("EffectTab");
  };

  render() {
    const buttonColor = theme().buttonColor;

    return (
      <View style={styles.centerContainer}>
        <Text>{I18n.t("welcome")}</Text>
        <Button
          color={buttonColor}
          style={styles.centerContainer}
          onPress={this.onPress}
          title="Hey BROTHER!!"
        />
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
