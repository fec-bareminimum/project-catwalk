import React from "react"
import ReactDOM from "react-dom"
import App from "./Components/App.jsx"

import * as themes from "./theme/schema.json"
import { setToStorage } from "./utils/storage"

setToStorage("all-themes", themes.default)

ReactDOM.render(<App />, document.getElementById("app"))
