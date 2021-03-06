import React from "react"
import ProductComparison from "./ProductComparison.jsx"
import { ProductsContext } from "../../../../contexts/ProductsContext.jsx"
import sampleProductList from "sampleProductList"
import {
  screen,
  render as rltRender,
  within,
  fireEvent,
} from "../../../../test-utils.jsx"

const render = (ui, contextValue) => {
  const defualtValues = {}
  return rltRender(
    <ProductsContext.Provider value={{ ...defualtValues, ...contextValue }}>
      {ui}
    </ProductsContext.Provider>
  )
}

describe("ProductComparison", () => {
  // Have two mock product objects with characteristics to compare
  const productA = Object.assign({}, sampleProductList[0])
  const productB = Object.assign({}, sampleProductList[1])
  let container

  beforeEach(() => {
    const renderResult = render(<ProductComparison productToCompare={productB} />, {
      displayedProduct: productA,
    })
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

      // Extract the "features" key from the product
      const featureIndex = productA["features"]
        .map((e) => e.feature)
        .indexOf(rowFeatureName)

      expect(columns[1]).toHaveTextContent(rowFeatureName)

      // Extract this characteristic object from the featuresObj
      const featureObj = productA["features"][featureIndex]

      if (featureObj) {
        expect(columns[0]).toHaveTextContent("???")
      } else {
        expect(columns[0].innerHTML).toBe("")
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

      // Extract the "features" key from the product
      const featureIndex = productB["features"]
        .map((e) => e.feature)
        .indexOf(rowFeatureName)

      expect(columns[1]).toHaveTextContent(rowFeatureName)

      // Extract this characteristic object from the featuresObj
      const featureObj = productB["features"][featureIndex]

      if (featureObj) {
        expect(columns[2]).toHaveTextContent("???")
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
    render(<ProductComparison productToCompare={productB} />, mockContext)

    expect(fetchProductInfo).toHaveBeenCalledTimes(1)
    expect(fetchProductInfo).toHaveBeenCalledWith(productA)
  })

  test("should call fetchProductInfo if productB doesn't have 'features' key", () => {
    delete productB["features"]

    const mockContext = {
      displayedProduct: productA,
      fetchProductInfo: fetchProductInfo,
    }
    render(<ProductComparison productToCompare={productB} />, mockContext)

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
    render(<ProductComparison productToCompare={productB} />, mockContext)

    expect(fetchProductInfo).toHaveBeenCalledTimes(2)
  })

  test("accepts handleClick props and triggers when clicking the figure", () => {
    const handleClick = jest.fn()
    render(<ProductComparison handleClick={handleClick} />)

    fireEvent.click(screen.getByRole("figure"))
    expect(handleClick).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByRole("figure"))
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})
