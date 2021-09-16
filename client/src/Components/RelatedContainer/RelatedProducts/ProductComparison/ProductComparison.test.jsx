import React from "react"
import { screen, render, within } from "../../../../test-utils.jsx"
import ProductComparison from "./ProductComparison.jsx"
import { ProductsContext } from "../../../../contexts/ProductsContext.jsx"
import sampleProductList from "sampleProductList"

describe("ProductComparison", () => {
  // Have two mock product objects with characteristics to compare
  const productA = Object.assign({}, sampleProductList[0])
  const productB = Object.assign({}, sampleProductList[1])
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

  test("renders product titles in order: ProductA, then ProductB", () => {
    const productTitles = screen.getAllByRole("heading", { level: 4 })
    expect(productTitles).toHaveLength(2)
    expect(productTitles[0]).toHaveTextContent(productA["name"])
    expect(productTitles[1]).toHaveTextContent(productB["name"])
  })

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

  test("renders titles the first row of the table", () => {
    const columnHeaders = container.querySelectorAll("thead tr th")
    expect(columnHeaders[0]).toHaveTextContent(productA["name"])
    expect(columnHeaders[1]).not.toHaveTextContent()
    expect(columnHeaders[2]).toHaveTextContent(productB["name"])
  })

  test("column one renders check marks for present ProductA feature values", () => {
    // ProductA is passed into Context in beforeAll.
    // This component should pull displayedProduct from Context
    // Table should have values rendered from that displayedProduct object

    // Look at each row for column a
    const tableBodyRows = container.querySelectorAll("tbody tr")
    tableBodyRows.forEach((rowNode) => {
      // get the columns for this table row
      const columns = within(rowNode).getAllByRole("cell")

      // pull data from the row [featureValueA, featureName, featureValueB]
      const rowFeatureName = columns[1].textContent
      const featureIndex = productA["features"]
        .map((e) => e.feature)
        .indexOf(rowFeatureName)

      // Extract the "features" key from the product
      const featureObj = productA["features"][featureIndex]

      if (featureObj) {
        expect(columns[0]).toHaveTextContent(featureObj["value"])
      } else {
        expect(columns[0]).not.toHaveTextContent()
      }
    })
  })

  test("column three renders check marks for present ProductB feature values", () => {
    // Look at each row for column a
    const tableBodyRows = container.querySelectorAll("tbody tr")
    tableBodyRows.forEach((rowNode) => {
      // get the columns for this table row
      const columns = within(rowNode).getAllByRole("cell")

      // pull data from the row [featureValueA, featureName, featureValueB]
      const rowFeatureName = columns[1].textContent
      const featureIndex = productB["features"]
        .map((e) => e.feature)
        .indexOf(rowFeatureName)

      expect(columns[1]).toHaveTextContent(rowFeatureName)

      // Extract the "features" key from the product
      const featureObj = productB["features"][featureIndex]

      if (featureObj) {
        // A feature object had a value: null, it still appeared as a valid key
        expect(columns[2].innerHTML).toBe(featureObj["value"] || "")
      } else {
        expect(columns[2].innerHTML).toBe("")
      }
    })
  })

  // test("when length of table is too long, table should become scrollable", () => {
  //   expect(false).toBe(true)
  // })

  // test("product names remain fixed atop the list during scroll", () => {
  //   expect(false).toBe(true)
  // })

  // test("renders the Product short name", () => {
  //   expect(false).toBe(true)
  // })
})

describe("ProductComparison Without Features Details", () => {
  let productA, productB, fetchProductInfo
  beforeEach(() => {
    fetchProductInfo = jest.fn()
    productA = Object.assign({}, sampleProductList[0])
    productB = Object.assign({}, sampleProductList[1])
  })
  test("sampleProductList has at least 2 valid objects", () => {
    expect(sampleProductList.length).toBeGreaterThan(1)
  })

  test("should call fetchProductInfo if productA doesn't have 'features' key", () => {
    delete productA["features"]

    const mockContext = {
      displayedProduct: productA,
      fetchProductInfo: fetchProductInfo,
    }
    render(
      <ProductsContext.Provider value={mockContext}>
        <ProductComparison productToCompare={productB} />
      </ProductsContext.Provider>
    )

    expect(fetchProductInfo).toHaveBeenCalledTimes(1)
    expect(fetchProductInfo).toHaveBeenCalledWith(productA)
  })

  test("should call fetchProductInfo if productB doesn't have 'features' key", () => {
    delete productB["features"]

    const mockContext = {
      displayedProduct: productA,
      fetchProductInfo: fetchProductInfo,
    }
    render(
      <ProductsContext.Provider value={mockContext}>
        <ProductComparison productToCompare={productB} />
      </ProductsContext.Provider>
    )

    // Wait for component to trigger useEffect check
    expect(fetchProductInfo).toHaveBeenCalledTimes(1)
    expect(fetchProductInfo).toHaveBeenCalledWith(productB)
  })

  test("should call fetchProductInfo twice if productA and productB don't have 'features' keys", () => {
    delete productA["features"]
    delete productB["features"]

    const mockContext = {
      displayedProduct: productA,
      fetchProductInfo: fetchProductInfo,
    }
    render(
      <ProductsContext.Provider value={mockContext}>
        <ProductComparison productToCompare={productB} />
      </ProductsContext.Provider>
    )

    expect(fetchProductInfo).toHaveBeenCalledTimes(2)
  })
})
