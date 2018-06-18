import * as actions from "./actions";
import { initialState } from "./initialState";

export default function goblalReducer(state, action) {
  switch (action.type) {
    case actions.CLEAR_DATA:
      return initialState;
    case actions.SET_BRIGHTNESS:
      return { ...state, brightness: action.brightness };
    case actions.SET_COLOR:
      return { ...state, color: action.color };
    case actions.SET_THEME:
      return { ...state, theme: action.theme };
    case actions.SET_LANGUAGE:
      return { ...state, language: action.language };
    case actions.SET_POWER:
      return { ...state, power: action.power };
    default:
      return state;
  }
}
