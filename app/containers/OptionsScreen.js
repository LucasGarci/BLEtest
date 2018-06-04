import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"

export class OptionsScreen extends React.Component {
  onPress = () => {
    console.log('OpptionsTab')
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Text>This is OPTIONS</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
