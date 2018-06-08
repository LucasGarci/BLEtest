import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from "react-native"
import { Dial } from 'react-native-dial'

export class TempTab extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      temperature: props.initialTemp,
    }
  }

  onPress = () => {
    console.log(TempTab)
  }

  changeTemp (angle) {
    const temperature = this.calcTempFromAngle(angle)
    this.setState({temperature})
    console.log({temperature})
    console.log({angle})
  }

  calcTempFromAngle = (angle) => {
    let aux
    if (angle < 0) aux = angle + 360
    aux = 360 - (angle | 0) % 360
    const result =
      aux / 360 * (this.props.maxTemp - this.props.minTemp) + this.props.minTemp
    return result | 0
  }

  render() {
    return (
      <View style={styles.centerContainer}>
        <Text> Controlador dial de Temperatura </Text>
        <Dial wrapperStyle={styles.wheelWrapper}
          elastic
          ref={node => {
            this.dial = node
          }}
          precision={5}
          radiusMax={1.15}
          radiusMin={1.15}
          initialRadius={1.15}
          onValueChange={a => this.changeTemp(a)} />
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