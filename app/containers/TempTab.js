import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from "react-native"
import { Dial } from 'react-native-dial'

export class TempTab extends React.Component {
  onPress = () => {
    console.log(TempTab)
  }

  render() {
    return (
      <View style={styles.centerContainer}>
        <Text> Controlador dial de Temperatura </Text>
        <Dial wrapperStyle={styles.wheelWrapper} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wheelWrapper: {
    shadowColor: 'rgba(0,0,0,.7)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
  },
})