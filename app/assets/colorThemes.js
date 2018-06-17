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
    bigSliderBot: "#fafafa",
    bigSliderTop: "#007AF5",
    linkColor: "#60a0cb",
    pressedLinkColor: "#60b0fb"
  },
  dark: {
    buttonColor: "rgb(2, 150, 136)",
    textColor: "#fafafa",
    bgColor: "#003870",
    bgLightColor: "#002447",
    cardColor: "#fbfbfb",
    borderColor: "#bfbfbf",
    iconColor: "#ffffff",
    bigSliderBot: "#007AF5",
    bigSliderTop: "#fafafa",
    linkColor: "#D0D8FD",
    pressedLinkColor: "#F4D0FD"
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
