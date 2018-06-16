import { store } from "../redux/store";

const DARK_THEME = "DARK_THEME";
const LIGHT_THEME = "LIGHT_THEME";

export const colorTheme = {
  light: {
    buttonColor: "#99e6ff",
    textColor: "#1a1a1a",
    bgColor: "#f2f2f2",
    cardColor: "#fbfbfb",
    borderColor: "#bfbfbf",
    iconColor: "#ffffff"
  },
  dark: {
    buttonColor: "#99e6ff",
    textColor: "#1a1a1a",
    bgColor: "#f2f2f2",
    cardColor: "#fbfbfb",
    borderColor: "#bfbfbf",
    iconColor: "#ffffff"
  }
};

export function getCurrentTheme() {
  const chosen = store.getState().theme;
  console.log({COLOR_THEME:chosen})
  switch (chosen) {
    case DARK_THEME:
      return colorTheme.dark;
    case LIGHT_THEME:
      return colorTheme.light;
    default:
      return colorTheme.light;
  }
}

export const theme = store.subscribe(getCurrentTheme);

/* MODO DE EMPLEO

import theme from './colorThemes'

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 70,
    borderRadius: 10,
    backgroundColor: theme.bgColor
  }
})

*/

