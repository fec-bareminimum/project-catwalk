import React from "react"
import { screen, render, fireEvent } from "../../../../test-utils.jsx"
import ProductCard from "./ProductCard.jsx"
import { ProductsContext } from "../../../../contexts/ProductsContext.jsx"
import sampleProduct from "./sampleProduct"
import sampleProductReviews from "sampleProductReviews"

describe("ProductCard", () => {
  // TODO:
  //  - 1.4.1.1.1: conditional render for SALE price
  const MockActionBtn = () => <button>ACTION BUTTON</button>

  let props
  beforeEach(() => {
    props = { ...sampleProduct, ActionBtn: MockActionBtn }
  })

  test("renders product details from props", () => {
    render(<ProductCard {...props} />)
    expect(screen.getByText("Camo Onesie")).toBeInTheDocument()
    expect(screen.getByText("Jackets")).toBeInTheDocument()
    expect(screen.getByText("$140")).toBeInTheDocument()
  })

  test("renders an image for the product", () => {
    render(<ProductCard {...props} />)
    expect(screen.getByRole("img")).toBeInTheDocument()
  })

  test("accepts a button component from props and renders it", () => {
    // BeforeAll function adds ActionButton to props by defualt
    render(<ProductCard {...props} />)

    expect(screen.getByText("ACTION BUTTON")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("ACTION BUTTON")
  })

  test("renders star rating", () => {
    const { container } = render(<ProductCard {...props} />)
    // Searching for component from https://www.npmjs.com/package/react-bootstrap-star-rating
    const StarRating = container.querySelector(".star-rating")
    expect(StarRating).toBeInTheDocument()
  })

  test("when the style is discounted, the sale price should appear in red, followed by the original price which is struckthrough", () => {
    const placeholderStyles = {
      results: [
        {
          original_price: "140.00",
          sale_price: "100.00",
        },
      ],
    }
    const { container } = render(
      <ProductCard {...props} styles={placeholderStyles} />
    )
    expect(screen.getByText("$140")).toBeInTheDocument()
    expect(screen.getByText("$100")).toBeInTheDocument()

    const strikeThroughElem = container.querySelector("span")
    expect(strikeThroughElem).toBeInTheDocument()
    expect(strikeThroughElem).toHaveAttribute("style")

    const styleString = { "text-decoration": "line-through", color: "red" }
    expect(strikeThroughElem.style["_values"]).toEqual(styleString)
  })

  test("clicking the body updates the currently display product in context", () => {
    // Mock the Context function that should be triggered
    const updateDisplayedProduct = jest.fn()
    const { container } = render(
      <ProductsContext.Provider value={{ updateDisplayedProduct }}>
        <ProductCard {...props} />
      </ProductsContext.Provider>
    )

    // Click this product card
    const cardElem = container.querySelector(".card-body")
    expect(cardElem).toBeInTheDocument()
    fireEvent.click(cardElem)

    expect(updateDisplayedProduct).toHaveBeenCalledTimes(1)
  })

  test("clicking the body updates the detail page to display THIS product", () => {
    const updateDisplayedProduct = jest.fn()
    const { container } = render(
      <ProductsContext.Provider value={{ updateDisplayedProduct }}>
        <ProductCard {...props} />
      </ProductsContext.Provider>
    )

    fireEvent.click(container.querySelector(".card-body"))

    // State will update "asynchronously, THEN we can
    // verify that the DOM rendered the new value
    setTimeout(() => {
      const descText = sampleProduct.description
      expect(screen.getByText(descText)).toBeInTheDocument()
    }, 0)
  })

  test("renders the comparison component on hover", () => {
    render(<ProductCard {...props} />)
    fireEvent.mouseOver(screen.getByText(props.name))

    setTimeout(() => {
      expect(screen.getByRole("figure")).toBeInTheDocument()
      expect(screen.getByText(props.description)).toBeInTheDocument()
    }, 0)

    fireEvent.mouseLeave(screen.getByText(props.name))

    setTimeout(() => {
      expect(screen.getByRole("figure")).not.toBeInTheDocument()
    }, 0)
  })
})
