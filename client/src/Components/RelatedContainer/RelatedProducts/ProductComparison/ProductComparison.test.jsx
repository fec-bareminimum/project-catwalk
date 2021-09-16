import React from "react"
import { screen, render, within } from "../../../../test-utils.jsx"
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
    const renderResult = render(
      <ProductsContext.Provider value={mockContext}>
        <ProductComparison productToCompare={productB} />
      </ProductsContext.Provider>
    )
    container = renderResult.container
  })

  test("sampleProductList has at least 2 valid objects", () => {
    expect(sampleProductList.length).toBeGreaterThan(1)
  })

  test("renders a figure", () => {
    expect(screen.getByRole("figure")).toBeInTheDocument()
  })

  test("renders 'COMPARING' header text", () => {
    expect(screen.getByText("COMPARING")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("COMPARING")
  })

  test("renders ProductA title", () => {
    const title = productA["name"]
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  test("renders ProductB title", () => {
    const title = productB["name"]
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  test("renders titles in order: ProductA, then ProductB", () => {
    const productTitles = screen.getAllByRole("heading", { level: 4 })
    expect(productTitles).toHaveLength(2)
    expect(productTitles[0]).toHaveTextContent(productA["name"])
    expect(productTitles[1]).toHaveTextContent(productB["name"])
  })

  // test("renders the Product short name", () => {
  //   expect(false).toBe(true)
  // })

  test("renders a table", () => {
    expect(container.querySelector("table")).toBeInTheDocument()
  })

  test("table should have three columns", () => {
    const tableHeads = container.querySelectorAll("thead")
    expect(tableHeads).toHaveLength(1)
    const headRows = container.querySelectorAll("thead tr")
    expect(headRows.length).toBeGreaterThan(0)

    const columnHeaders = container.querySelectorAll("thead tr th")
    expect(columnHeaders.length).toEqual(3)
  })

  test("renders titles first row of the table", () => {
    const columnHeaders = container.querySelectorAll("thead tr th")
    expect(columnHeaders[0]).toHaveTextContent(productA["name"])
    expect(columnHeaders[1]).not.toHaveTextContent()
    expect(columnHeaders[2]).toHaveTextContent(productB["name"])
  })

  test("ProductA should match the 'currently displayed product' of for the entire page", () => {
    // ProductA is passed into Context in beforeAll.
    // This component should pull displayedProduct from Context
    // Table should have values rendered from that displayedProduct object

    const hasCharacteristic = (product, characLabel) => {
      return product[characLabel] !== undefined
    }

    // const columnAChecks = [true, false, true, false]
    // const characteristicsColumn = ['yo mama']

    // If column one has a check mark, the checks array[ROW INDEX] will be true
    // If this product has that characteristic, a check mark should
    // have been found at that row
    characteristicsColumn.forEach((characLabel, rowIndex) => {
      const isChecked = columnAChecks[rowIndex]
      expect(hasCharacteristic(productA)).toEqual(isChecked)
    })
  })

  /*
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
*/
})

describe("ProductComparison Without Features Details", () => {
  const productA = Object.assign({}, sampleProductList[0])
  delete productA["features"]
  const productB = Object.assign({}, sampleProductList[1])
  delete productB["features"]

  let fetchProductInfo

  beforeEach(() => {
    fetchProductInfo = jest.fn()
    const mockContext = {
      displayedProduct: productA,
      fetchProductInfo: fetchProductInfo,
    }
    render(
      <ProductsContext.Provider value={mockContext}>
        <ProductComparison productToCompare={productB} />
      </ProductsContext.Provider>
    )
  })

  test("sampleProductList has at least 2 valid objects", () => {
    expect(sampleProductList.length).toBeGreaterThan(1)
  })

  test("should called fetchProductInfo if productA doesn't have 'features' key", () => {
    expect(false).toBeNull()
  })

  test("should called fetchProductInfo if productB doesn't have 'features' key", () => {
    expect(false).toBeNull()
  })
})
