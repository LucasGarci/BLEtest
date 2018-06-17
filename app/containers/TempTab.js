import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import { tempScale } from "../assets/tempScale";
import BleManager from "react-native-ble-manager";
import { store } from "../redux/store";
import { theme } from "../assets/colorThemes";

var conversor = require("convert-hex");

export class TempTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 0,
      xOffset: 900,
      currentColor: "",
      devicesConnected: {},
      deviceInfo: {}
    };
    this.writing = false;
  }

  componentDidMount() {
    this.retrieveConnected();
    setTimeout(
      () => this.refs.test.scrollTo({ x: this.state.xOffset, y: 0 }),
      0
    );
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      console.log({ ConnectedDevices: results });
      this.setState({ devicesConnected: results });
    });
  }

  async onScrollHandler(event) {
    const newOffset = event.nativeEvent.contentOffset.x;
    this.setState({ xOffset: newOffset });
    if (!this.writing) {
      const fraction = 2060 / tempScale.length;
      const indexItem = Math.round(newOffset / fraction);
      const colorRGB = tempScale[indexItem];
      this.writing = true;
      BleManager.checkState();
      this.setState({ currentColor: colorRGB });
      const device = this.state.devicesConnected[0];
      //Sacamos los servicios
      await BleManager.retrieveServices(device.id)
        .then(deviceInfo => {
          this.setState({ deviceInfo });
        })
        .catch(error => {
          console.log(error);
        });

      const deviceInfo = this.state.deviceInfo;
      const mode = "0x56";

      //concatenamos mode+r+g+b+constant
      const colorToWrite = mode.concat(colorRGB, "00f0aa");
      const data = conversor.hexToBytes(colorToWrite);
      const brightness = store.getState().brightness;

      data[1] = Math.round(data[1] * brightness);
      data[2] = Math.round(data[2] * brightness);
      data[3] = Math.round(data[3] * brightness);

      await BleManager.write(
        deviceInfo.id,
        deviceInfo.characteristics[3].service,
        deviceInfo.characteristics[3].characteristic,
        data
      )
        .then(() => {
          // Success code
          console.log("Writed: " + data);
        })
        .catch(error => {
          // Failure code
          console.log(error);
        });
      this.writing = false;
    }
  }

  getColorForOffset() {}

  onPressLeft = () => {
    console.log("pulsado izquierda");
    if (this.isScrollable()) {
      this.setState({ xOffset: this.state.xOffset - 100 });
      console.log(this.state.xOffset);
      setTimeout(
        () =>
          this.refs.test.scrollTo({
            x: this.state.xOffset,
            y: 0,
            animated: true
          }),
        0
      );
    }
  };
  onPressRight = () => {
    console.log("pulsado derecha");
    if (this.isScrollable()) {
      this.setState({ xOffset: this.state.xOffset + 100 });
      console.log(this.state.xOffset);
      setTimeout(
        () =>
          this.refs.test.scrollTo({
            x: this.state.xOffset,
            y: 0,
            animated: true
          }),
        0
      );
    }
  };

  isScrollable = () => {
    currentPosition = this.state.xOffset;
    console.log({ currentPosition });
    if (currentPosition > 100 && currentPosition < 1950) {
      return true;
    }
    if (this.state.xOffset <= 100) {
      this.setState({ xOffset: 101 });
    }
    if (this.state.xOffset >= 1950) {
      this.setState({ xOffset: 1949 });
    }
    return false;
  };

  render() {
    return (
      <View style={styles.allContainer}>
        <ScrollView
          ref="test"
          showsHorizontalScrollIndicator={false}
          centerContent
          horizontal
          style={styles.imageContainer}
          onScroll={event => {
            this.onScrollHandler(event);
          }}
        >
          <Image source={require("../img/warmstring.png")} resizeMode="cover" />
        </ScrollView>
        <View style={styles.restContainer}>
          <View style={styles.midContainer}>
            <Icon name="change-history" color={theme().iconsTemp} size={32} />
          </View>
          <View style={styles.buttonContainer}>
          <View style={[styles.buttonContainerExt, {borderColor: theme().iconsTemp}]}>
              <TouchableOpacity onPress={() => this.onPressLeft()}>
                <Icon name="chevron-left" color={theme().iconsTemp} size={64} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainerCenter}>
              <Icon name="highlight" color={theme().iconsTemp} size={64} />
            </View>
            <View style={[styles.buttonContainerExt, {borderColor: theme().iconsTemp}]}>
              <TouchableOpacity onPress={() => this.onPressRight()}>
                <Icon name="chevron-right" color={theme().iconsTemp} size={64} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
    borderRadius: 10
  },
  imageContainer: {
    flex: 1,
    margin: -1,
    borderRadius: 200
  },
  restContainer: {
    flex: 1,
    margin: 1
  },
  midContainer: {
    flex: 1,
    alignItems: "center",
    margin: 0
  },
  buttonContainer: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    margin: 5
  },
  buttonContainerCenter: {
    flex: 2,
    alignItems: "center"
  },
  buttonContainerExt: {
    flex: 1,
    borderWidth: 5,
    borderRadius: 40,
    margin: 5,
    padding: 1,
    alignItems: "center"
  }
});
