import { createStore, applyMiddleware } from "redux";
import globalReducer from "./reducers";
import { initialState } from "./initialState";


const needThisToDebugState =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// createStore (reductores,<estadoInicial>,<mejoras>)
export const store = createStore(
  globalReducer, // persistedReducer
  initialState,
  needThisToDebugState
);
