import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from "react-native"
import { ColorWheel } from 'react-native-color-wheel';
import { PrefabPicker } from "../components/PrefabPicker"

export class ColorTab extends React.Component {
  onPress = () => {
    console.log("ColorTab")
  }
  render() {
    return (
      <View style={styles.wheelContainer}>
        <View style={styles.wheelContainer}>
          <ColorWheel
            initialColor="#ee0000"
            onColorChange={color => console.log({ color })}
            style={styles.wheelStyle}
            thumbStyle={styles.thumb} />
        </View>
        <View style={styles.wheelContainer}>
          <PrefabPicker />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wheelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelStyle: {
    width: Dimensions.get('window').width / 1.25,
    marginTop: 25,  
  },
  thumb: {
    height: 30,
    width: 30,
    borderRadius: 10,
  }
})

