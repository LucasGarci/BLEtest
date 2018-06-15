import * as actions from './actions'

export default function goblalReducer(state, action) {
    switch (action.type) {
        case actions.CLEAR_DATA:
            return state
        case actions.CLEAR_PREFAB:
            return state
        case actions.SET_PREFAB:
            return state
        case actions.SET_THEME:
            return { ...state, theme: action.theme }
        case actions.SET_LANGUAGE:
            return { ...state, language: action.language }
        default:
            return state
    }
}