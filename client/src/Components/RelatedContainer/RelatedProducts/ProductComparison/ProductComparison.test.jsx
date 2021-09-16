import React from "react"
import { screen, render } from "../../../../test-utils.jsx"
import ProductComparison from "./ProductComparison.jsx"
// import sampleProductList from 'sampleProductList';

describe("ProductComparison", () => {
  test("renders a figure", () => {
    render(<ProductComparison />)
    expect(screen.getByRole("figure")).toBeInTheDocument()
  })

  test("renders 'COMPARING' header text", () => {
    expect(false).toBe(true)
  })

  test("renders ProductA title", () => {
    expect(false).toBe(true)
  })

  test("renders ProductB title", () => {
    expect(false).toBe(true)
  })

  test("renders titles in order: ProductA, then ProductB", () => {
    expect(false).toBe(true)
  })

  test("ProductA should match the 'currently displayed product' of for the entire page", () => {
    expect(false).toBe(true)
  })

  test("ProductA should match the 'currently displayed product' of for the entire page", () => {
    expect(false).toBe(true)
  })

  test("renders the Product short name", () => {
    expect(false).toBe(true)
  })

  test("renders a table", () => {
    expect(false).toBe(true)
  })

  test("table should have three columns", () => {
    expect(false).toBe(true)
  })

  test("renders a check mark in the first and third column", () => {
    expect(false).toBe(true)
  })

  test("row renders two check marks when BOTH products have this characteristic", () => {
    expect(false).toBe(true)
  })

  test("row renders left check mark when ONLY ProductA has the characteristic", () => {
    expect(false).toBe(true)
  })

  test("row renders right check mark when ONLY ProductB has the characteristic", () => {
    expect(false).toBe(true)
  })

  test("renders product characteristic name in second table column", () => {
    expect(false).toBe(true)
  })

  test("first column renders characteristic checks for ProductB", () => {
    expect(false).toBe(true)
  })

  test("third column renders characteristic checks for ProductB", () => {
    expect(false).toBe(true)
  })

  test("all character names between ProductA and ProductB are rendered", () => {
    expect(false).toBe(true)
  })

  test("when length of table is too long, table should become scrollable", () => {
    expect(false).toBe(true)
  })

  test("product names remain fixed atop the list during scroll", () => {
    expect(false).toBe(true)
  })
})
