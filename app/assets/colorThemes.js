import { store } from "../redux/store";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

export const colorTheme = {
  light: {
    buttonColor: "#aae600",
    textColor: "#1a1a1a",
    bgColor: "#f2f2f2",
    cardColor: "#fbfbfb",
    borderColor: "#bfbfbf",
    iconColor: "#ffffff"
  },
  dark: {
    buttonColor: "#224420",
    textColor: "#1a1a1a",
    bgColor: "#f2f2f2",
    cardColor: "#fbfbfb",
    borderColor: "#bfbfbf",
    iconColor: "#ffffff"
  }
};

export function getCurrentTheme() {
  const chosen = store.getState().theme;
  console.log({ chosenColor: chosen });
  switch (chosen) {
    case DARK_THEME:
      console.log("Vamos oscurito");
      return colorTheme.dark;
    case LIGHT_THEME:
      return colorTheme.light;
    default:
      return colorTheme.light;
  }
}

store.subscribe(getCurrentTheme);

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
