import React from "react"
import { StyleSheet, Text, View,  ImageBackground, Button, TouchableOpacity } from "react-native"
import BigSlider from "react-native-big-slider"



export class BriTab extends React.Component {
    constructor() {
        super()
        this.state = { power: true, brightness: 30 }
    }

    onPress = () => {
        console.log("BriTab")
    }

    changeBrightness = (brightness) => {
        this.setState({ brightness })
        console.log({ BRILLO: this.state.brightness })
    }

    render() {
        return (
            <View style={[styles.centerContainer]}>
                <BigSlider
                    style={{ width: 110 }}
                    trackStyle={{ backgroundColor: 'rgb(255, 166, 102)' }}
                    maximumValue={100}
                    minimumValue={0}
                    value={this.state.brightness}
                    onValueChange={this.changeBrightness}
                    renderLabel={() => (
                        <BrightnessLabel
                            brightness={this.state.brightness}
                            power={this.state.power}
                        />
                    )}
                />
            </View >
        )
    }
}

const BrightnessLabel = props => {
    return (
        <View flex={1} justifyContent="center">
            <Text style={[styles.brightnessLabel, props.style]}>
                {(() => {
                
                    return props.power
                        ? `${formatNumber(props.brightness || 0)}%\n Brightness`
                        : 'Off'
                })()}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    brightnessLabel: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
    },
    topButtons: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 15,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25,
      },
})

function formatNumber(x) {
    return parseInt(x, 10)
        .toFixed(1)
        .replace(/.?0*$/, '')
}