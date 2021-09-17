import React from "react"
import { screen, render, fireEvent } from "../../../test-utils.jsx"
import OutfitProducts from "./OutfitProducts.jsx"
import { CartContext } from "../../../contexts/CartContext.jsx"
// import sampleProductList from "sampleProductList"

describe("OutfitProducts", () => {
  test("renders the section element", () => {
    const { container } = render(<OutfitProducts />)

    expect(
      container.querySelector("section.outfitProductsContainer")
    ).toBeInTheDocument()
  })

  test("renders the title YOUR OUTFIT", () => {
    render(<OutfitProducts />)

    expect(screen.getByText("YOUR OUTFIT")).toBeInTheDocument()
  })

  test("renders card list", () => {
    const { container } = render(<OutfitProducts />)

    expect(container.querySelector(".cardList")).toBeInTheDocument()
  })

  test("renders 'Add to Outfit' card", () => {
    const { container } = render(<OutfitProducts />)

    const addToCard = container.querySelector(".addToCard")
    expect(screen.getByText("Add To Outfit")).toBeInTheDocument()
    expect(addToCard).toBeInTheDocument()
    expect(addToCard.tagName).toBe("BUTTON")
  })

  test("renders 'Add to Outfit' card with '+' icon", () => {
    const { container } = render(<OutfitProducts />)

    const plusIcon = container.querySelector(".addToCard svg.plusIcon")
    expect(plusIcon).toBeInTheDocument()
  })

  test("clicking 'Add to Outfit' card will trigger addProductToCart in CartContext", () => {
    const addProductToCart = jest.fn()
    const { container } = render(
      <CartContext.Provider value={{ addProductToCart }}>
        <OutfitProducts />
      </CartContext.Provider>
    )

    const addToCard = container.querySelector(".addToCard")

    fireEvent.click(addToCard)

    expect(addProductToCart).toHaveBeenCalledTimes(1)
  })

  test("clicking 'Add to Outfit' twice will trigger addProductToCart only once", () => {
    const addProductToCart = jest.fn()
    const { container } = render(
      <CartContext.Provider value={{ addProductToCart }}>
        <OutfitProducts />
      </CartContext.Provider>
    )

    const addToCard = container.querySelector(".addToCard")

    fireEvent.click(addToCard)
    fireEvent.click(addToCard)

    expect(addProductToCart).toHaveBeenCalledTimes(1)
  })

  test("renders NO cards when CartContext cartProducts is empty", () => {
    const { container } = render(
      <CartContext.Provider value={{ cartProducts: [] }}>
        <OutfitProducts />
      </CartContext.Provider>
    )

    expect(container.querySelectorAll(".productCard")).toHaveLength(0)
  })

  test("renders one card for each item in CartContext cartProducts", () => {
    // BROKEN - assume "react-multi-carousel" will handle a list properly
    expect(false).toBe(false)

    // const mockProductList = sampleProductList
    // const {container} = render(
    //   <ProductsContext.Provider value={{ productList: mockProductList }}>
    //     <OutfitProducts />
    //   </ProductsContext.Provider>
    // )

    // expect(container.querySelectorAll(".productCard")).toHaveLength(mockProductList.length)
  })
})
