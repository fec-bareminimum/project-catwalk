import React from "react"
import { render, screen } from "../../test-utils.jsx"
import RelatedContainer from "./RelatedContainer.jsx"

describe("RelatedContainer", () => {
  test("renders Related Container component", () => {
    render(<RelatedContainer />)
  })

  test("displays RELATED PRODUCTS and OUTFIT containers", () => {
    const { container } = render(<RelatedContainer />)

    expect(
      container.querySelector("section.relatedProductsContainer")
    ).toBeInTheDocument()
    expect(
      container.querySelector("section.outfitProductsContainer")
    ).toBeInTheDocument()
  })
})
