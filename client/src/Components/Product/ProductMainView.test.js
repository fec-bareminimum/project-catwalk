import React from "react"
import { render, screen, fireEvent, getByLabelText } from "../../test-utils.jsx"
import ProductMainView from "./ProductMainView.jsx"
import { ProductsContext } from "../../contexts/ProductsContext.jsx"

describe("Product", () => {
  test("renders Product component", () => {
    render(<ProductMainView />)
  })

  test("Finds the Project Title", () => {
    const { container } = render(<ProductMainView />)
    expect(screen.getByRole("header")).toBeInTheDocument()
  })

  test("Finds the price", () => {
    render(<ProductMainView />)
    expect(screen.getByText("price")).toBeInTheDocument()
  })

  test("Ratings", () => {
    render(<ProductMainView />)
    expect(screen.getByText("ratings")).toBeInTheDocument()
  })

  test("Finds the bag", () => {
    render(<ProductMainView />)
    expect(screen.getByRole("Add To Bag")).toBeInTheDocument()
  })

  test("Test Button Component", () => {
    render(<ProductMainView />)
    expect(screen.getByText("button")).toBeInTheDocument()
  })

  test("Click", () => {
    const { container } = render(<ProductMainView />)
    const button = getByTestId(container, "btn-how-to-choose-provider")
    fireEvent.click(button)
  })

  test("Displays Read All Reviews", () => {
    render(<ProductMainView />)
    expect(screen.getByText("Read All Reviews")).toBeInTheDocument()
  })

  test("Add To Bag", () => {
    render(<ProductMainView />)
    expect(screen.getByText("Add To Bag")).toBeInTheDocument()
  })

  test("Share on social media", () => {
    render(<ProductMainView />)
    expect(screen.getByText("Share on social media")).toBeInTheDocument()
  })

  test("Select Size", () => {
    render(<ProductMainView />)
    expect(screen.getByText("Select Size")).toBeInTheDocument()
  })

  test("renders carousel", () => {
    const { container } = render(<ProductMainView />)
    expect(container.querySelector("carousel")).toBeInTheDocument()
  })
})
