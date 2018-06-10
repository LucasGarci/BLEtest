import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Card } from "react-native-elements";

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
  onPress = () => {
    console.log("Pulsado");
  };
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
            onPress={this.onPress}
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
            onPress={this.onPress}
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
            onPress={this.onPress}
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
            onPress={this.onPress}
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
