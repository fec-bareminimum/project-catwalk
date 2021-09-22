import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App.jsx"
import * as themes from "./theme/schema.json"
import { setToStorage } from "./utils/storage"
import "bootstrap/dist/css/bootstrap.min.css"

setToStorage("all-themes", themes.default)

ReactDOM.render(<App />, document.getElementById("app"))
