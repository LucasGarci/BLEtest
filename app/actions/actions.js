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