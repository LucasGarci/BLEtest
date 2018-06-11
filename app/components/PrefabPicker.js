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

  onPress1 = () => {
    console.log("Pulsado");
    const color = hsv2Hex(this.props.color.h,this.props.color.s,this.props.color.v) 
    this.setState({ color1: color })
  };
  onPress2 = () => {
    console.log("Pulsado");
    const color = hsv2Hex(this.props.color.h,this.props.color.s,this.props.color.v) 
    this.setState({ color2: color })
  };
  onPress3 = () => {
    console.log("Pulsado");
    const color = hsv2Hex(this.props.color.h,this.props.color.s,this.props.color.v) 
    this.setState({ color3: color })
  };
  onPress4 = () => {
    console.log("Pulsado");
    const color = hsv2Hex(this.props.color.h,this.props.color.s,this.props.color.v) 
    this.setState({ color4: color })
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

hsv2Hex = function (h, s, v) {
  var rgb = hsv2Rgb(h, s, v)
  return rgb2Hex(rgb.r, rgb.g, rgb.b)
}

rgb2Hex = function (r, g, b) {
  if (typeof r === 'object') {
    const args = r
    r = args.r; g = args.g; b = args.b;
  }
  r = Math.round(r).toString(16)
  g = Math.round(g).toString(16)
  b = Math.round(b).toString(16)

  r = r.length === 1 ? '0' + r : r
  g = g.length === 1 ? '0' + g : g
  b = b.length === 1 ? '0' + b : b

  return '#' + r + g + b
}

hsv2Rgb = function (h, s, v) {
  if (typeof h === 'object') {
    const args = h
    h = args.h; s = args.s; v = args.v;
  }

  h = _normalizeAngle(h)
  h = (h === 360) ? 1 : (h % 360 / parseFloat(360) * 6)
  s = (s === 100) ? 1 : (s % 100 / parseFloat(100))
  v = (v === 100) ? 1 : (v % 100 / parseFloat(100))

  var i = Math.floor(h)
  var f = h - i
  var p = v * (1 - s)
  var q = v * (1 - f * s)
  var t = v * (1 - (1 - f) * s)
  var mod = i % 6
  var r = [v, q, p, p, t, v][mod]
  var g = [t, v, v, q, p, p][mod]
  var b = [p, p, t, v, v, q][mod]

  return {
    r: Math.floor(r * 255),
    g: Math.floor(g * 255),
    b: Math.floor(b * 255),
  }
}

function _normalizeAngle (degrees) {
  return (degrees % 360 + 360) % 360;
}
