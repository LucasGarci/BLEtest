import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"

export class OptionsButton extends React.Component {
  _onPress = () => {
    console.log({ PROPS: this.props })
    this.props.navigation.navigate("Options")
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this._onPress}>
        <View>
          <Icon 
            name= 'settings'
            color= 'white'
            size= {32}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 5,
  }
})
