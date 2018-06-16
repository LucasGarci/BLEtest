import * as actions from "./actions";

export default function goblalReducer(state, action) {
  switch (action.type) {
    case actions.CLEAR_DATA:
      return state;
    case actions.CLEAR_PREFAB:
      return state;
    case actions.SET_PREFAB:
      return state;
    case actions.SET_BRIGHTNESS:
      return { ...state, brightness: action.brightness };
    case actions.SET_COLOR:
      return { ...state, color: action.color };
    case actions.SET_THEME:
      return { ...state, theme: action.theme };
    case actions.SET_LANGUAGE:
      return { ...state, language: action.language };
    default:
      return state;
  }
}
