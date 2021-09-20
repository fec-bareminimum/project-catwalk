import React from "react"
import { screen, render, fireEvent } from "../../../../test-utils.jsx"
import { CartContext } from "../../../../contexts/CartContext.jsx"
import sampleProduct from "sampleProduct"
import RemoveButton from "./RemoveButton.jsx"

describe("RemoveButton", () => {
  test("renders a button by default", () => {
    render(<RemoveButton />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("renders an svg inside of the button", () => {
    const { container } = render(<RemoveButton />)

    expect(container.querySelector("button svg.removeIcon")).toBeInTheDocument()
  })

  test("clicking triggers removeProductFromCart in CartContext", () => {
    const removeProductFromCart = jest.fn()
    render(
      <CartContext.Provider value={{ removeProductFromCart }}>
        <RemoveButton product={sampleProduct} />
      </CartContext.Provider>
    )

    fireEvent.click(screen.getByRole("button"))

    expect(removeProductFromCart).toHaveBeenCalledTimes(1)
  })
})
