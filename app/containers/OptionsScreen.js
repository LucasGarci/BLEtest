import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";

export class OptionsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      language: "Spanish"
    };
  }
  onPress = () => {
    console.log("OpptionsTab");
  };

  render() {
    return (
      <View style={styles.centerContainer}>
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
                console.log(this.state.language)
              }}
            >
              <Picker.Item label="Español" value="es" />
              <Picker.Item label="English" value="en" />
            </Picker>
          </View>
        </View>

        <View style={styles.optionContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.textOption}>Borrar datos locales:</Text>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.textOption}>Button</Text>
          </View>
        </View>

        <View style={styles.optionContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.textOption}>Esquema de colores:</Text>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.textOption}>Switch</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.optionContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.textOption}>Salir de la aplicación</Text>
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.textOption}>Bye!!</Text>
            </View>
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.link}>Averigua como me han hecho ;)</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    marginTop: 5,
    borderRadius: 10
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5,
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
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  textOption: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#606060"
  },
  link: {
    fontSize: 19,
    color: "#3366fB"
  }
});
