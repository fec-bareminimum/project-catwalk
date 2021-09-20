import React from "react"
import { screen, render, fireEvent } from "../../../../test-utils.jsx"
import StarButton from "./StarButton.jsx"

describe("StartButton", () => {
  test("renders a button by default", () => {
    render(<StarButton />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("renders an svg inside of the button", () => {
    const { container } = render(<StarButton />)

    expect(container.querySelector("button svg.starIcon")).toBeInTheDocument()
  })

  test("renders a figure after clicking the button", () => {
    render(<StarButton />)

    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("figure")).toBeInTheDocument()
  })

  test("renders the button again after clicking the figure", () => {
    render(<StarButton />)

    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("figure")).toBeInTheDocument()

    setTimeout(() => {
      fireEvent.click(screen.getByRole("figure"))
      expect(screen.getByRole("button")).toBeInTheDocument()
    }, 0)
  })
})
