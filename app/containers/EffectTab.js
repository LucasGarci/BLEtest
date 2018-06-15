import React from "react"
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from "react-native"
import I18n from '../../I18n/I18n';

export class EffectTab extends React.Component {
  onPress = () => {
    console.log("EffectTab")
  }

  render() {
    return (
        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>{I18n.t('welcome')}</Text>
          </TouchableOpacity>
        </View>
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