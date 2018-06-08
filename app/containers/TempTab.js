import React from "react"
import { StyleSheet, Image, Text, View, Button, TouchableOpacity, Dimensions } from "react-native"
import { Triangle } from "../assets/Triangle"

export class TempTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      temperature: 0,
      xPosition: 0,
    }
  }

  render() {
    return (
      <View style={styles.allContainer}>
        <View style={styles.imageContainer}>
          <Text>Aquí va la imagen</Text>
        </View>
        <View style={styles.restContainer}>
          <Triangle cigarrito={() => funfunkA(this)} />
        </View>
        <View style={styles.terceraCaja}>
          <View style={styles.terceraCajaExt}><Text>Btn Izq</Text></View>
          <View style={styles.terceraCajaCenter}>
            <Text style={styles.terceraCajaCenterText}>HOT AND COLD TO FLAMA</Text>
          </View>
          <View style={styles.terceraCajaExt}><Text>Btn Dch</Text></View>
        </View>
      </View>
    )
  }
}

funfunkA = (asd) => {
  console.log("pulsado triangulo")
  asd.setState({ xPosition: asd.state.xPosition+20 })
  console.log(asd.state.xPosition)
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 2,
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'red',
  },
  restContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'steelblue',
  },
  terceraCaja: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'steelblue',
  },
  terceraCajaCenter: {
    flex: 2,
    borderWidth: 1,
    alignItems: 'center',
  },
  terceraCajaCenterText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 30,
  },
  terceraCajaExt: {
    flex: 1,
    borderWidth: 1
  },


})



