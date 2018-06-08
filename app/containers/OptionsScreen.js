import React from "react"
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from "react-native"

export class OptionsScreen extends React.Component {
  onPress = () => {
    console.log('OpptionsTab')
  }



  render() {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.optionContainer} >
          <View style={styles.descriptionContainer}><Text>Texto de explicación</Text></View>
          <View style={styles.switchContainer}><Text>Switch</Text></View>
        </View>
        <View style={styles.optionContainer} >
          <View style={styles.descriptionContainer}><Text>Texto de explicación</Text></View>
          <View style={styles.switchContainer}><Text>Switch</Text></View>
        </View>
        <View style={styles.optionContainer} >
          <View style={styles.descriptionContainer}><Text>Texto de explicación</Text></View>
          <View style={styles.switchContainer}><Text>Switch</Text></View>
        </View>
        <View style={styles.optionContainer} >
          <View style={styles.descriptionContainer}><Text>Texto de explicación</Text></View>
          <View style={styles.switchContainer}><Text>Switch</Text></View>
        </View>
        <View style={styles.optionContainer} >
          <View style={styles.descriptionContainer}><Text>Texto de explicación</Text></View>
          <View style={styles.switchContainer}><Text>Switch</Text></View>
        </View>
        
        
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 15,
    backgroundColor: 'powderblue',
  },
  optionContainer: {
     flexDirection: 'row',  
     justifyContent: 'center',
     margin: 3,
     height: 60,
  }, switchContainer: {
    flex: 1, borderWidth: 1,  backgroundColor: 'steelblue',
  }, descriptionContainer: {
    flex: 4, borderWidth: 1,   backgroundColor: 'skyblue',
  }


})