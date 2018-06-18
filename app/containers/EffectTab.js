import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";
import I18n from "../../I18n/I18n";
import { theme } from "../assets/colorThemes";
import BleManager from "react-native-ble-manager";


export class EffectTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devicesConnected: {},
      deviceInfo: {}
    };
    this.writing = false;
  }

  onPress = async () => {
    await this.retrieveConnected();
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      console.log({ results })
      BleManager.disconnect(results[0].id)
        .then(console.log("disconected")
        )
        .catch((error) => {
          // Failure code
          console.log(error);
        });

      BleManager.removeBond(results[0].id)
        .then(() => {
          console.log('removeBond success');
        })
        .catch(() => {
          console.log('fail to remove the bond');
        })

    });
  }

  render() {

    return (
      <View style={styles.centerContainer}>
        <View style={styles.centerContainer}>
          <Text style={[{ fontSize: 18 }, { color: theme().textColor }]}>{I18n.t("comming_soon")}</Text>
        </View     >
        <View style={styles.centerContainer}>
          <Button
            color={theme().buttonColor}
            title="EMERGENCY BUTTON"
            onPress={this.onPress}
            style={[
              styles.textOption,
              { color: theme().textColor }
            ]}
          />
        </View>
      </View >
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
