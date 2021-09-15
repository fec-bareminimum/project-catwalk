import React from "react"
import { render } from "../test-utils.jsx"
import App from "./App.jsx"
// import '@testing-library/jest-dom';

describe("App", () => {
  test("renders App component", () => {
    render(<App />)
  })
})

// test('General Information displayed at top of Overview'), () => {
//   expect()
// }
