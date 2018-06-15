export const SET_PREFAB = 'SET_PREFAB'
export const setPrefab = (color, brightness) => ({
    type: SET_PREFAB,
    color,
    brightness,
})

export const CLEAR_PREFAB = 'CLEAR_PREFAB'
export const clearPrefab = () => ({
    type: CLEAR_PREFAB,
})

export const CLEAR_DATA = 'CLEAR_DATA'
export const clearData = () => ({
    type: CLEAR_DATA,
})

export const SET_THEME = 'SET_THEME'
export const setTheme = theme =>({
    theme,
    type: SET_THEME,
})

export const SET_LANGUAGE = 'SET_LANGUAGE'
export const setLanguage = language =>({
    language,
    type: SET_LANGUAGE,
})