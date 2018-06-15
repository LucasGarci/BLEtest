import React from "react"
import { Root } from "./navigation/router"
import { Provider } from 'react-redux'
import { store } from './redux/store'

class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}
export default App