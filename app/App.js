import React from "react"
import { Root } from "./navigation/router"

var translator = require('../I18n/I18n.js');

class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
        <Root />
    )
  }
}
export default App