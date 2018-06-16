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

var conversor = require("convert-hex");
// Obtenemos la clase para suscribirnos
const BleManagerModule = NativeModules.BleManager;
//Creamos el emisor de eventos
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
//Botón encendido o apagado
const switchOn = true;

export class PowerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devicesConnected: {},
      deviceInfo: {},
      lastUpdateValue: {}
    };
    this.handleBleManagerDidUpdateState = this.handleBleManagerDidUpdateState.bind(
      this
    );
  }

  componentDidMount() {
    this.retrieveConnected();
    this.handlerUpdate = bleManagerEmitter.addListener(
      "BleManagerDidUpdateState",
      this.handleBleManagerDidUpdateState
    );
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      console.log({ ConnectedDevices: results });
      this.setState({ devicesConnected: results });
    });
  }

  handleBleManagerDidUpdateState(data) {
    console.log(
      "Received data from " +
        data.peripheral +
        " characteristic " +
        data.characteristic,
      data.value
    );
    this.setState({ lastUpdateValue: data });
  }

  async handleOnPress() {
    BleManager.checkState();
    const device = this.state.devicesConnected[0];
    console.log({ CT_devConected: device });

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
    // Esta es la unica caracteristica que responde a startNotific...
    await BleManager.startNotification(
      deviceInfo.id,
      deviceInfo.characteristics[4].service,
      deviceInfo.characteristics[4].characteristic
    ).catch(errNotif => console.log({ errNotif }));

    //Creamos enlace o certificamos que esta creado
    await BleManager.createBond(deviceInfo.id)
      .then(() => {
        console.log("Bonding its OK");
      })
      .catch(() => {
        console.log("Fail to bond");
      });

    const off = "CC2433";
    const on = "CC2333";
    go = switchOn ? off : on;
    switchOn = !switchOn;

    const data = conversor.hexToBytes(go);

    await BleManager.write(
      deviceInfo.id,
      deviceInfo.characteristics[3].service,
      deviceInfo.characteristics[3].characteristic,
      data
    )
      .then(() => {
        index = 10;
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
          <Icon name={iconName} color="grey" size={32} />
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
