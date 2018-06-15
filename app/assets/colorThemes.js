const DARK_THEME = "DARK_THEME";
const LIGHT_THEME = "LIGHT_THEME";

//CARGAR ESTO DE REDUX
const chosen = LIGHT_THEME;

export const theme = {
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

export function chosenTheme(chosen) {
  switch (chosen) {
    case DARK_THEME:
      return theme.light;
    case LIGHT_THEME:
      return theme.dark;
    default:
      return theme.default;
  }
}
