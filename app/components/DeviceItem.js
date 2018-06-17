import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card, Icon } from "react-native-elements";
import BleManager from "react-native-ble-manager";
import I18n from "../../I18n/I18n";
import Buffer from "buffer";
import { bytesToString } from "convert-string";
import { connect } from "react-redux";
import { store } from "../redux/store";
import { theme } from "../assets/colorThemes";

var conversor = require("convert-hex");
// Documentación: https://www.npmjs.com/package/convert-hex

@connect(state => {
  return {
    language: state.language,
    theme: state.theme
  };
})
export class DeviceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      rssi: null,
      connected: false,
      devices: new Map()
    };
    this.device = {};
  }

  componentDidMount() {
    const { device } = this.props;
    this.setState({
      id: device.id,
      name: device.name || I18n.t("anonymous"),
      rssi: device.rssi,
      connected: device.connected
    });
    this.device = this.props.device;
  }

  _onPress = async () => {
    const { device } = this.props;
    await BleManager.connect(device.id)
      .then(() => {
        let devices = this.state.devices;
        let p = devices.get(device.id);
        if (p) {
          p.connected = true;
          devices.set(device.id, p);
          this.setState({ devices });
        }
        console.log("Connected to " + device.id);
        this.props.navigation.navigate("Device", {
          device: this.props.device
        });
      })
      .catch(error => {
        console.log("Connection error", error);
      });

    await BleManager.connect(device.id)
      .then(() => {
        let devices = this.state.devices;
        let p = devices.get(device.id);
        if (p) {
          p.connected = true;
          devices.set(device.id, p);
          this.setState({ devices });
        }
        console.log("Connected to " + device.id);
      })
      .catch(error => {
        console.log("Connection error", error);
      });
  };

  render() {
    return (
      <TouchableOpacity style={{ paddingBottom: 0 }} onPress={this._onPress}>
        <Card
          containerStyle={[
            styles.list,
            {
              backgroundColor: theme().bgLightColor
            }
          ]}
        >
          <View style={styles.cardStyle}>
            <View style={{ flex: 1 }}>
              <Icon
                name="bluetooth-searching"
                color={this.state.rssi ? "grey" : theme().bluethoot}
                size={48}
                style={{ alignItems: "center" }}
              />
            </View>
            <View style={{ flex: 3 }}>
              <Text style={[
                    {fontSize: 16},
                    { color: theme().textColor }
                  ]}>Id: {this.state.id} </Text>
              <Text style={[
                    {fontSize: 16},
                    { color: theme().textColor }
                  ]}>{I18n.t("name")} {this.state.name}</Text>
              {this.state.rssi ? (
                <Text style={[
                  {fontSize: 16},
                  { color: theme().textColor }
                ]}>Rssi: {this.state.rssi} </Text>
              ) : null}
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 7,
    marginRight: -22,
    marginLeft: 18,
    marginBottom: 10,
    borderRadius: 10
  },
  cardStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
