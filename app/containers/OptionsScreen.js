import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Picker,
  Button,
  Switch,
  Linking
} from "react-native";
import RNExitApp from "react-native-exit-app";
import { Card } from "react-native-elements";
import { store } from "../redux/store";
import { setLanguage, setTheme, clearData } from "../redux/actions";
import { connect } from "react-redux";
import I18n from "../../I18n/I18n";
import { theme } from "../assets/colorThemes";

@connect(state => {
  return {
    language: state.language,
    theme: state.theme
  };
})
export class OptionsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      switchValue: props.theme === "dark" ? true : false,
      colorScheme: "izquierda",
      linkColor: theme().linkColor
    };
  }

  onSwitch(value) {
    if (value) {
      //true es a la derecha(verde)
      this.setState({ switchValue: value });
      store.dispatch(setTheme("dark"));
      return;
    }
    this.setState({ switchValue: value });
    store.dispatch(setTheme("light"));
  }

  handleDeletePress() {
    const this_may_cause = I18n.t("this_may_cause");
    const are_you_sure = I18n.t("are_you_sure");
    const yes = I18n.t("yes");
    const no = I18n.t("no");
    Alert.alert(
      this_may_cause,
      are_you_sure,
      [
        {
          text: no
        },
        { text: yes, onPress: () => store.dispatch(clearData()) }
      ],
      { cancelable: false }
    );
  }

  handleByePress() {
    const exit = I18n.t("closeApp");
    const wantToExit = I18n.t("wantToExit");
    const yes = I18n.t("yes");
    const no = I18n.t("no");
    Alert.alert(
      exit,
      wantToExit,
      [
        {
          text: no
        },
        { text: yes, onPress: () => RNExitApp.exitApp() }
      ],
      { cancelable: false }
    );
  }

  handleLinkPress = () => {
    this.setState({ linkColor: theme().pressedLinkColor });
    Linking.openURL("https://facebook.github.io/react-native/");
  };

  switchValueFromRedux = () => {
    if (!this.props.theme === "light") {
      return true;
    }
    return false;
  };

  handlePicker(language) {
    store.dispatch(setLanguage(language));
    I18n.locale = store.getState().language;
  }

  render() {
    const del = I18n.t("delete");
    const bye = I18n.t("bye");
    return (
        <View
          style={[
            styles.centerContainer,
            { backgroundColor: theme().bgColor }
          ]}
        >
          <Card
            containerStyle={[
              styles.list,
              {
                backgroundColor: theme().bgLightColor
              }
            ]}
          >
            <View style={styles.optionContainer}>
              <View style={styles.descriptionContainer}>
                <Text
                  style={[
                    styles.textOption,
                    { color: theme().textColor }
                  ]}
                >
                  {I18n.t("selectLang")}
                </Text>
              </View>
              <View style={styles.switchContainer}>
                <Picker
                  selectedValue={this.props.language}
                  style={{
                    position: "absolute",
                    left: 0,
                    height: 50,
                    width: 150,
                    borderWidth: 1,
                    color: theme().textColor
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.handlePicker(itemValue)
                  }
                >
                  <Picker.Item label="Español" value="es" />
                  <Picker.Item label="English" value="en" />
                </Picker>
              </View>
            </View>
          </Card>

          <Card
            containerStyle={[
              styles.list,
              {
                backgroundColor: theme().bgLightColor
              }
            ]}
          >
            <View style={styles.optionContainer}>
              <View style={styles.descriptionContainer}>
                <Text
                  style={[
                    styles.textOption,
                    { color: theme().textColor }
                  ]}
                >
                  {I18n.t("deleteLD")}
                </Text>
              </View>
              <View style={styles.switchContainer}>
                <Button
                  color={theme().buttonColor}
                  title={del}
                  onPress={this.handleDeletePress}
                  style={[
                    styles.textOption,
                    { color: theme().textColor }
                  ]}
                />
              </View>
            </View>
          </Card>

          <Card
            containerStyle={[
              styles.list,
              {
                backgroundColor: theme().bgLightColor
              }
            ]}
          >
            <View style={styles.optionContainer}>
              <View style={styles.descriptionContainer}>
                <Text
                  style={[
                    styles.textOption,
                    { color: theme().textColor }
                  ]}
                >
                  {I18n.t("colorSchema")} {this.props.theme}
                </Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  onValueChange={value => this.onSwitch(value)}
                  value={this.state.switchValue}
                  thumbTintColor={theme().textColor}
                />
              </View>
            </View>
          </Card>

          <View style={styles.footer}>
            <Card
              containerStyle={[
                styles.list,
                {
                  backgroundColor: theme().bgLightColor
                }
              ]}
            >
              <View style={styles.optionContainer}>
                <View style={styles.descriptionContainer}>
                  <Text
                    style={[
                      styles.textOption,
                      { color: theme().textColor }
                    ]}
                  >
                    {I18n.t("closeApp")}
                  </Text>
                </View>
                <View style={styles.switchContainer}>
                  <Button
                    color={theme().buttonColor}
                    title={bye}
                    onPress={this.handleByePress}
                    style={[
                      styles.textOption,
                      { color: theme().textColor }
                    ]}
                  />
                </View>
              </View>
            </Card>

            <Card
              containerStyle={[
                styles.list,
                {
                  backgroundColor: theme().bgLightColor
                }
              ]}
            >
              <View style={styles.optionContainer}>
                <View style={styles.descriptionContainer}>
                  <Text
                    style={{
                      fontSize: 19,
                      color: theme().linkColor
                    }}
                    onPress={this.handleLinkPress}
                  >
                    {I18n.t("findOut")}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 70,
    borderRadius: 10
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
    fontSize: 18,
  },
  link: {
    fontSize: 19
  },
  list: {
    padding: 0,
    margin: 8,
    borderRadius: 10
  }
});
