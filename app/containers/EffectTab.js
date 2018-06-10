import React from "react"
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from "react-native"
import { BackgroundImage } from "../components/BgImg"

export class EffectTab extends React.Component {
  onPress = () => {
    console.log("EffectTab")
  }

  render() {
    return (

      <ImageBackground
        source={require('../img/fondoapp.png')}
        style={{ width: '100%', height: '100%' }} >
        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>This is EffectTab</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
  },
})