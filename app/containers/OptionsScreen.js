import React from "react";
import { StyleSheet, Text, View, ImageBackground, Picker, Switch } from "react-native";
import { Card } from "react-native-elements";

export class OptionsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      language: "Spanish",
      switchValue: true,
      colorScheme: "izquierda"
    };
  }
  onPress = () => {
    console.log("OpptionsTab");
  };

  onSwitch(value) {
    value
      ? this.setState({ switchValue: value, colorScheme: "derecha" })
      : this.setState({ switchValue: value, colorScheme: "izquierda" });
  }

  render() {
    return (
      <ImageBackground
        source={require('../img/fondoapp.png')}
        style={{ width: '100%', height: '100%' }} >
      <View style={styles.centerContainer}>
        <Card containerStyle={styles.list}>
          <View style={styles.optionContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.textOption}>Seleccionar idioma: </Text>
            </View>
            <View style={styles.switchContainer}>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ language: itemValue });
                  console.log(this.state.language);
                }}
              >
                <Picker.Item label="Español" value="es" />
                <Picker.Item label="English" value="en" />
              </Picker>
            </View>
          </View>
        </Card>

        <Card containerStyle={styles.list}>
          <View style={styles.optionContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.textOption}>Borrar datos locales:</Text>
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.textOption}>Button</Text>
            </View>
          </View>
        </Card>

        <Card containerStyle={styles.list}>
          <View style={styles.optionContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.textOption}>
                Esquema de colores: {this.state.colorScheme}
              </Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={value => this.onSwitch(value)}
                value={this.state.switchValue}
              />
            </View>
          </View>
        </Card>

        <View style={styles.footer}>
          <Card containerStyle={styles.list}>
            <View style={styles.optionContainer}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.textOption}>Salir de la aplicación</Text>
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.textOption}>Bye!!</Text>
              </View>
            </View>
          </Card>

          <Card containerStyle={styles.list}>
            <View style={styles.optionContainer}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.link}>Averigua como me han hecho ;)</Text>
              </View>
            </View>
          </Card>
        </View>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 70,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  switchContainer: {
    flex: 1,
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  descriptionContainer: {
    flex: 3,
    paddingLeft: 20,
    justifyContent: "center"
  },
  footer: {
    flex: 1,
    paddingBottom: 1,
    justifyContent: "flex-end",
    flexDirection: "column"
  },
  textOption: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#606060"
  },
  link: {
    fontSize: 19,
    color: "#3366fB"
  },
  list: {
    padding: 0,
    margin: 8,
    borderRadius: 10
  }
});
