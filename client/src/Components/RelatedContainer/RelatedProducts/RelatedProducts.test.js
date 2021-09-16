import React from "react"
import { screen, render, fireEvent } from "../../../test-utils.jsx"
import RelatedProducts from "./RelatedProducts.jsx"
import { ProductsContext } from "../../../contexts/ProductsContext.jsx"
import sampleProduct from "sampleProduct"

describe("RelatedProducts", () => {
  test("renders the section element", () => {
    const { container } = render(<RelatedProducts />)
  })

  test("renders the title RELATED PRODUCTS", () => {})

  test("renders one card for each item in ProductsContext productList", () => {
    const mockProductList = sampleProductList
    const { container } = render(
      <ProductsContext.Provider value={{ productList: mockProductList }}>
        <RelatedProducts />
      </ProductsContext.Provider>
    )

    screen.debug()
    expect(true).toBeNull()
  })
})
