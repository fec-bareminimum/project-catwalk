import React from "react"
import {
  render,
  screen,
  fireEvent,
  getByLabelText,
  getByRole,
} from "../../test-utils.jsx"
import ProductCarouselList from "./ProductDetails.jsx"
import { ProductsContext } from "../../contexts/ProductsContext.jsx"

describe("ProductCarouselList", () => {
  test("renders ProductCarouselList", () => {
    render(<ProductCarouselList />)
  })

  test("carousel images", () => {
    render(<ProductCarouselList />)
    const thumb = screen.getByRole("img")
    expect(thumb).toHaveAttribute("className", "carouselImage")
  })

  test("carousel expanded images", () => {
    render(<ProductCarouselList />)
    const thumb = screen.getByRole("img")
    expect(thumb).toHaveAttribute("className", "carouselExpandedImage")
  })
})
