import React from "react"
import { screen, render } from "../../../../test-utils.jsx"
import ProductComparison from "./ProductComparison.jsx"
import { ProductsContext } from "../../../../contexts/ProductsContext.jsx"
import sampleProductList from "sampleProductList"

const addComparisonCombinations = (productA, productB) => {
  const extendedA = Object.assign({}, productA)
  const extendedB = Object.assign({}, productB)

  // add a, b
  // add a, not b
  // add not a, b

  return [extendedA, extendedB]
}

describe("ProductComparison", () => {
  // Have two mock product objects with characteristics to compare
  const [productA, productB] = addComparisonCombinations(
    sampleProductList[0],
    sampleProductList[1]
  )
  let container

  beforeEach(() => {
    const mockContext = {
      displayedProduct: productA,
    }
    container = render(
      <ProductsContext.Provider value={mockContext}>
        <ProductComparison productToCompare={productB} />
      </ProductsContext.Provider>
    )
  })

  test("sampleProductList has at least 2 valid objects", () => {
    expect(sampleProductList.length).toBeGreaterThan(1)
  })

  // test("renders a figure", () => {
  //   expect(screen.getByRole("figure")).toBeInTheDocument()
  // })

  // test("renders 'COMPARING' header text", () => {
  //   expect(screen.getByText("COMPARING")).toBeInTheDocument()
  //   expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("COMPARING")
  // })

  test("renders ProductA title", () => {
    const title = productA["name"]
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  test("renders ProductB title", () => {
    const title = productB["name"]
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  test("renders titles in order: ProductA, then ProductB", () => {
    const productTitles = screen.getByRoleAll("heading", { level: 4 })
    expect(productTitles).toHaveLength(2)
    expect(productTitles[0]).toHaveTextContent(productA["name"])
    expect(productTitles[1]).toHaveTextContent(productB["name"])
  })

  // test("renders the Product short name", () => {
  //   expect(false).toBe(true)
  // })

  // test("renders a table", () => {
  //   expect(false).toBe(true)
  // })

  test("renders titles first row of the table", () => {
    expect(false).toBe(true)
    // const productTitles = screen.getByRoleAll("heading", { level: 4 })
    // expect(productTitles).toHaveLength(2)
  })

  test("table should have three columns", () => {
    expect(false).toBe(true)
  })

  test("ProductA should match the 'currently displayed product' of for the entire page", () => {
    expect(false).toBe(true)
  })

  test("ProductA should match the 'currently displayed product' of for the entire page", () => {
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
