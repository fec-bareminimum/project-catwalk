import React from "react"
import { render, screen } from "../../test-utils.jsx"
import RelatedContainer from "./RelatedContainer.jsx"

describe("RelatedContainer", () => {
  test("renders Related Container component", () => {
    render(<RelatedContainer />)
  })

  test("displays RELATED PRODUCTS and OUTFIT containers", () => {
    const { container } = render(<RelatedContainer />)

    expect(container.querySelectorAll("section")).toHaveLength(2)
    expect(
      container.querySelector("section.relatedProductsContainer")
    ).toBeInTheDocument()
    expect(
      container.querySelector("section.outfitProductsContainer")
    ).toBeInTheDocument()
  })

  test("displays RELATED PRODUCTS section first", () => {
    const { container } = render(<RelatedContainer />)

    const sections = container.querySelectorAll("section")
    expect(sections[0]).toHaveTextContent("RELATED PRODUCTS")
  })

  test("displays OUTFITS section second", () => {
    const { container } = render(<RelatedContainer />)

    const sections = container.querySelectorAll("section")
    expect(sections[1]).toHaveTextContent("RELATED PRODUCTS")
  })
})
