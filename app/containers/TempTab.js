import React from "react"
import { StyleSheet, Image, Text, View, ScrollView, Button, TouchableOpacity, Dimensions } from "react-native"
import { Icon } from "react-native-elements"

export class TempTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: 0,
      xPosition: 0,
    }
  }

  /*
  changeTemp(angle) {
    const temperature = this.calcTempFromAngle(angle)
    this.setState({ temperature })
    console.log({ temperature })
    console.log({ angle })
  }

  calcTempFromAngle = (angle) => {
    let aux
    if (angle < 0) aux = angle + 360
    aux = 360 - (angle | 0) % 360
    const result =
      aux / 360 * (this.props.maxTemp - this.props.minTemp) + this.props.minTemp
    return result | 0
  }
*/

  render() {
    return (
      <View style={styles.allContainer}>
        <ScrollView showsHorizontalScrollIndicator={false} centerContent horizontal style={styles.imageContainer}>
          <Image source={require('../img/warmstring.png')} resizeMode='cover' />
        </ScrollView>
        <View style={styles.restContainer}>
          <View style={styles.midContainer}>
            <Icon name='change-history' color='white' size={32} />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonContainerExt}>
              <TouchableOpacity onPress={() => onPressLeft(this)}>
                <Icon name='chevron-left' color='white' size={64} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainerCenter}>
              <Icon name='highlight' color='white' size={64} />
            </View>
            <View style={styles.buttonContainerExt}>
              <TouchableOpacity onPress={() => onPressRight(this)}>
                <Icon name='chevron-right' color='white' size={64} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

onPressLeft = (pulseIcon) => {
  console.log("pulsado izquierda")
  pulseIcon.setState({ xPosition: pulseIcon.state.xPosition - 20 })
  console.log(pulseIcon.state.xPosition)
}
onPressRight = (pulseIcon) => {
  console.log("pulsado derecha")
  pulseIcon.setState({ xPosition: pulseIcon.state.xPosition + 20 })
  console.log(pulseIcon.state.xPosition)
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: 'black',
  },
  restContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: 'yellow',
  },
  midContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'black',
  },
  buttonContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'black',
  },
  buttonContainerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  buttonContainerExt: {
    flex: 1,
    borderWidth: 1,
    margin: 5,
    alignItems: 'center',
  },
})