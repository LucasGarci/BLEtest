import React from "react"
import { Root } from "./navigation/router"

class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
        <Root />
    )
  }
}
export default App