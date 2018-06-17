import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  NativeEventEmitter,
  NativeModules
} from "react-native";
import { Icon } from "react-native-elements";
import BleManager from "react-native-ble-manager";
import { store } from "../redux/store";
import { setPower } from "../redux/actions";

var conversor = require("convert-hex");
//Botón encendido o apagado
const switchOn = true;

export class PowerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devicesConnected: {},
      deviceInfo: {},
    };
  }

  componentDidMount() {
    this.retrieveConnected();
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      console.log({ ConnectedDevices: results });
      this.setState({ devicesConnected: results });
    });
  }

  async handleOnPress() {
    BleManager.checkState();
    const device = this.state.devicesConnected[0];

    //Sacamos los servicios
    await BleManager.retrieveServices(device.id)
      .then(deviceInfo => {
        console.log({ CT_devInf: deviceInfo });
        this.setState({ deviceInfo });
      })
      .catch(error => {
        console.log(error);
      });

    const deviceInfo = this.state.deviceInfo;
    const off = "CC2433";
    const on = "CC2333";
    go = switchOn ? off : on;
    const data = conversor.hexToBytes(go);
    switchOn = !switchOn;

    await BleManager.write(
      deviceInfo.id,
      deviceInfo.characteristics[3].service,
      deviceInfo.characteristics[3].characteristic,
      data
    )
      .then(() => {
        store.dispatch(setPower(switchOn));
        // Success code
        console.log("Writed: " + data);
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  }

  render() {
    const iconOff = "flash-off"
    const iconOn = "flash-on"
    iconName = switchOn ? iconOn : iconOff;
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.handleOnPress()}
      >
        <View>
          <Icon name={iconName} color="white" size={32} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 5
  }
});