import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"

export class EffectTab extends React.Component {
  onPress = () => {
    console.log("EffectTab")
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Text>This is EffectTab</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
