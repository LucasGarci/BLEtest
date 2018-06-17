import { createStore, applyMiddleware } from "redux";
import globalReducer from "./reducers";
import { initialState } from "./initialState";
import { AsyncStorage } from "react-native";
import { createStore } from "redux";
import { persistStore, persistReducer, autoRehydrate } from "redux-persist";

const needThisToDebugState =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const persistConfig = {
  key: "root",
  AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, globalReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};

// createStore (reductores,<estadoInicial>,<mejoras>)
export const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...needThisToDebugState), autoRehydrate())
);
