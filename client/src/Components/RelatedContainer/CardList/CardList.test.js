import React from "react"
import { screen, render, fireEvent } from "../../../test-utils.jsx"
import CardList from "./CardList.jsx"
import { ProductsContext } from "../../../contexts/ProductsContext.jsx"

// Short placeholder list for of product objects
const sampleProductList = [
  {
    id: 42366,
    name: "Camo Onesie",
  },
  {
    id: 423466,
    name: "Heir Force Ones",
  },
]

describe("CardList", () => {
  // TODO: accepts an action button React Node for the card (e.g. <button>Like</button>)

  test("renders the react-multi-carousel (npm) component ul", () => {
    const { container } = render(<CardList products={sampleProductList} />)
    expect(container.querySelector("ul")).toBeInTheDocument()
  })

  test("renders the list title", () => {
    render(<CardList listTitle={"SAMPLE TITLE"} />)
    expect(screen.getByRole("heading")).toBeInTheDocument()
    expect(screen.getByText("SAMPLE TITLE")).toBeInTheDocument()
  })

  /* IRRELEVANT TESTS with react-multi-carousel

  test("renders one card for each item in the products prop", () => {
    render(<CardList products={sampleProductList} />)
    const cardImages = screen.queryAllByRole("img")
    expect(cardImages).toHaveLength(sampleProductList.length)
  })

  test("renders a right scroll arrow by default", () => {
    render(<CardList products={sampleProductList} />)

    expect(screen.getByLabelText("Go to next slide")).toBeInTheDocument()
  })

  test("renders the left arrow after scrolling all the way right ", () => {
    render(<CardList products={sampleProductList} />)

    // Scroll the carousel to the right
    const rightScrollBtn = screen.getByText(">")

    for (let i = 0; i < 5; i++) {
      fireEvent.click(rightScrollBtn)
    }

    const leftSlideBtn = screen.getByLabelText("Go to previous slide")
    expect(leftSlideBtn).toBeInTheDocument()
  })

  test("if first card is on left edge, the left arrow should be hidden", () => {
    // TODO
    expect(true).toBeNull()
  })

  test("if first card on left edge, the left arrow should be hidden", () => {
    // TODO
    expect(true).toBeNull()
  })

  test("when the last card appears on the far right of the list, the right arrow will be hidden", () => {
    // TODO
    expect(true).toBeNull()
  })

  test("children renders the ActionBtn prop for each product item", () => {
    render(
      <CardList
        products={sampleProductList}
        ActionBtn={<button>SAMPLE ACTION BTN</button>}
      />
    )
    const actionButtons = screen.getAllByText("SAMPLE ACTION BTN")
    expect(actionButtons).toHaveLength(sampleProductList.length)
  })

  test("children renders no ActionBtn with empty products list", () => {
    render(<CardList products={[]} ActionBtn={<button>SAMPLE ACTION BTN</button>} />)
    expect(screen.queryByText("SAMPLE ACTION BTN")).toBeNull()
  }) */
})
