import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"

export class ColorTab extends React.Component {
  onPress = () => {
    console.log("ColorTab")
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Text>This is ColorTab</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
