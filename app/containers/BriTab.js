import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"
import BigSlider from "react-native-big-slider"



export class BriTab extends React.Component {
    onPress = () => {
        console.log("BriTab")
    }

    constructor() {
        super()
        const brightness = 30
        const power = false
        this.state = { power, brightness, sliding: false }
    }

    render() {
        return (
            <BigSlider
                style={{ width: 110 }}
                trackStyle={{ backgroundColor: 'rgb(255, 166, 102)' }}
                maximumValue={30}
                minimumValue={-120}
                value={this.state.valB} />

        )
    }
}
