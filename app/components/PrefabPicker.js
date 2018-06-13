import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Card } from "react-native-elements";
import {hsv2Hex, hex2Hsv, hex2Hsl} from 'colorsys'


export class PrefabPicker extends Component {
  constructor() {
    super();
    this.state = {
      color1: "#ff0000",
      color2: "#00ff00",
      color3: "#2020ff",
      color4: "#ffff00"
    };
  }

  onPress1 = () => {
    console.log("Pulsado");
    const color = hsv2Hex(
      this.props.color.h,
      this.props.color.s,
      this.props.color.v
    );
    this.setState({ color1: color });
  };
  onPress2 = () => {
    console.log("Pulsado");
    const color = hsv2Hex(
      this.props.color.h,
      this.props.color.s,
      this.props.color.v
    );
    this.setState({ color2: color });
  };
  onPress3 = () => {
    console.log("Pulsado");
    const color = hsv2Hex(
      this.props.color.h,
      this.props.color.s,
      this.props.color.v
    );
    this.setState({ color3: color });
  };
  onPress4 = () => {
    console.log("Pulsado");
    const color = hsv2Hex(
      this.props.color.h,
      this.props.color.s,
      this.props.color.v
    );
    this.setState({ color4: color });
  };

  onLongPressHandle1(){
  }
  onLongPressHandle2(){
  }
  onLongPressHandle3(){
  }
  onLongPressHandle4(){
  }

  render() {
    return (
      <View
        style={{
          //  flex: 1,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View style={styles.pickerItem}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.state.color1,
              borderRadius: 45
            }}
            onLongPress={this.onLongPressHandle1()}
            onPress={this.onPress1}
          >
            <Text>{JSON.stringify(this.state.color1)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerItem}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.state.color2,
              borderRadius: 45
            }}
            onLongPress={this.onLongPressHandle2}
            onPress={this.onPress2}
          >
            <Text>{JSON.stringify(this.state.color2)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerItem}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.state.color3,
              borderRadius: 45
            }}
            onLongPress={this.onLongPressHandle3}
            onPress={this.onPress3}
          >
            <Text>{JSON.stringify(this.state.color3)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerItem}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: this.state.color4,
              borderRadius: 45
            }}
            onLongPress={this.onLongPressHandle1}
            onPress={this.onPress4}
          >
            <Text>{JSON.stringify(this.state.color4)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerItem: {
    width: 70,
    height: 70,
    margin: 10,
    borderWidth: 2,
    borderRadius: 45
  },
  touchItem: {}
});

//Sustituidas las funciones de cambio de colores por las del modulo colorsys

