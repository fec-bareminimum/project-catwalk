import React from "react"
import { screen, render } from "../../../../test-utils.jsx"
import ProductComparison from "./ProductComparison.jsx"
// import sampleProductList from 'sampleProductList';

describe("ProductComparison", () => {
  test("renders a figure", () => {
    render(<ProductComparison />)
    expect(screen.getByRole("figure")).toBeInTheDocument()
  })

  test("does something else", () => {
    expect(false).toBe(true)
  })
})
