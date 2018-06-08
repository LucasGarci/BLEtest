import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

export class Triangle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            xPosition: 200
        }
    }

    render() {
      return (
        <TouchableOpacity style={styles.triangle}  onPress={this.props.cigarrito}>
         
        </TouchableOpacity>
      )
    }
  }
  
  const styles = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 100,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red'
      }
  })
  