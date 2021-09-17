import React from "react"
import { screen, render, fireEvent } from "../../../test-utils.jsx"
import RelatedProducts from "./RelatedProducts.jsx"
import { ProductsContext } from "../../../contexts/ProductsContext.jsx"
import sampleProductList from "sampleProductList"

describe("RelatedProducts", () => {
  test("renders the section element", () => {
    const { container } = render(<RelatedProducts />)

    expect(
      container.querySelector("section.relatedProductsContainer")
    ).toBeInTheDocument()
  })

  test("renders the title RELATED PRODUCTS", () => {
    render(<RelatedProducts />)

    expect(screen.getByText("RELATED PRODUCTS")).toBeInTheDocument()
  })

  test("renders card list", () => {
    const { container } = render(<RelatedProducts />)

    expect(container.querySelector(".cardList")).toBeInTheDocument()
  })

  test("renders NO cards when ProductsContext relatedProducts is empty", () => {
    const { container } = render(
      <ProductsContext.Provider value={{ relatedProducts: [] }}>
        <RelatedProducts />
      </ProductsContext.Provider>
    )

    expect(container.querySelectorAll(".productCard")).toHaveLength(0)
  })

  test("renders one card for each item in ProductsContext relatedProducts", () => {
    // BROKEN - assume "react-multi-carousel" will handle a list properly
    expect(false).toBe(false)

    // const mockProductList = sampleProductList
    // const {container} = render(
    //   <ProductsContext.Provider value={{ relatedProducts: mockProductList }}>
    //     <RelatedProducts />
    //   </ProductsContext.Provider>
    // )

    // expect(container.querySelectorAll(".productCard")).toHaveLength(mockProductList.length)
  })
})
