import { store } from "../redux/store";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

export const colorTheme = {
  light: {
    buttonColor: "#66b3ff",
    textColor: "#404040",
    bgColor: "#cce6ff",
    bgLightColor: "#fafaff",
    cardColor: "#fbfbfb",
    borderColor: "#bfbfbf",
    iconColor: "#ffffff",
    bigSlider: "rgb(255, 186, 202)",
    linkColor: "#60a0cb",
    pressedLinkColor: "#60b0fb"
  },
  dark: {
    buttonColor: "rgb(2, 150, 136)",
    textColor: "#eeeeee",
    bgColor: "#003366",
    bgLightColor: "#004080",
    cardColor: "#fbfbfb",
    borderColor: "#bfbfbf",
    iconColor: "#ffffff",
    bigSlider: "rgb(255, 066, 102)",
    linkColor: "#a0b0fb",
    pressedLinkColor: "#d0b0fb"
  }
};

export function theme() {
  const chosen = store.getState().theme;
  switch (chosen) {
    case DARK_THEME:
      return colorTheme.dark;
    case LIGHT_THEME:
      return colorTheme.light;
    default:
      return colorTheme.light;
  }
}

store.subscribe(theme);

/*
import theme from './colorThemes'

theme.buttonColor
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
