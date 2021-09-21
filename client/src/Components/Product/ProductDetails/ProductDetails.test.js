import React from "react"
import {
  render,
  screen,
  fireEvent,
  getByLabelText,
  getByRole,
} from "../../test-utils.jsx"
import ProductMainView from "./ProductMainView.jsx"
import ProductDetails from "./ProductDetails.jsx"
import { ProductsContext } from "../../contexts/ProductsContext.jsx"

describe("Product Details", () => {
  test("renders Product Details", () => {
    render(<ProductDetails />)
  })

  test("should render social", () => {
    render(<ProductDetails />)
    const thumb = screen.getByRole("button")
    expect(thumb).toHaveAttribute("description", "aiueo")
  })
})
