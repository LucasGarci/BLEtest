import React from "react"
import { StyleSheet, Image,  ImageBackground, Text, View, ScrollView, Button, TouchableOpacity, Dimensions } from "react-native"
import { Icon, Card } from "react-native-elements"

export class TempTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: 0,
      xOffset: 900,
    }
  }

componentDidMount() {
  setTimeout(() => this.refs.test.scrollTo({ x: this.state.xOffset, y: 0 }) , 0);
}  

onPressLeft = () => {
  console.log("pulsado izquierda")
  this.setState({ xOffset: this.state.xOffset - 100 })
  console.log(this.state.xOffset)
  setTimeout(() => this.refs.test.scrollTo({ x: this.state.xOffset, y: 0, animated: true }) , 0);
}
onPressRight = () => {
  console.log("pulsado derecha")
  this.setState({ xOffset: this.state.xOffset + 100 })
  console.log(this.state.xOffset)
  setTimeout(() => this.refs.test.scrollTo({ x: this.state.xOffset, y: 0,  animated: true }) , 0)
}

  render() {
    return (
      <View style={styles.allContainer}>
        <ScrollView
          ref='test'
          showsHorizontalScrollIndicator={false}
          centerContent horizontal
          style={styles.imageContainer}
          onScroll={event => {
            this.setState({ xOffset: event.nativeEvent.contentOffset.x })
            console.log({ offset: this.state.xOffset })
          }}
        >
          <Image source={require('../img/warmstring.png')} resizeMode='cover' />
        </ScrollView>
        <View style={styles.restContainer}>
          <View style={styles.midContainer}>
            <Icon name='change-history' color='black' size={32} />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonContainerExt}>
              <TouchableOpacity onPress={() => this.onPressLeft()}>
                <Icon name='chevron-left' color='black' size={64} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainerCenter}>
              <Icon name='highlight' color='black' size={64} />
            </View>
            <View style={styles.buttonContainerExt}>
              <TouchableOpacity onPress={() => this.onPressRight()}>
                <Icon name='chevron-right' color='black' size={64} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 1,
    borderRadius: 200,
  },
  restContainer: {
    flex: 1,
    margin: 1,
  },
  midContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
  },
  buttonContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  buttonContainerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  buttonContainerExt: {
    flex: 1,
    borderWidth: 5,
    borderRadius: 40,
    margin: 5,
    padding: 1,
    alignItems: 'center',
  },
})