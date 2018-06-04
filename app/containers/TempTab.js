import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"

export class TempTab extends React.Component {
  onPress = () => {
    console.log(TempTab)
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Text>This is TempTab</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
