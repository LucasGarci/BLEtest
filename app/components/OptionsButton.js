import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

export class OptionsButton extends React.Component {
  _onPress = () => {
    console.log({ PROPS: this.props })
    this.props.navigation.navigate("Options")
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this._onPress}>
        <View>
          <Text>Go options...</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#505050"
  }
})
