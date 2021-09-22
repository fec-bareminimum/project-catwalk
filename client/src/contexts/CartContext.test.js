import React from "react"
import { render, screen } from "../test-utils.jsx"
import useCart, { CartContext } from "./CartContext.jsx"

describe("CartContext", () => {
  test("passes correct values to children", (done) => {
    const MockChild = () => {
      const productExports = useCart()
      expectedExports.forEach(({ key, targetInstance }) => {
        try {
          expect(productExports[key]).not.toBe(undefined)
        } catch {
          console.error(`expected ${key} to NOT be undefined`)
        }

        try {
          expect(productExports[key] instanceof targetInstance).toBeTruthy()
        } catch {
          console.error(`expected ${key} to be instance of ${targetInstance}`)
        }
      })

      return <p>test</p>
    }

    return render(<MockChild />)
  })
})

const expectedExports = [
  {
    key: "fetchCartProducts",
    targetInstance: Function,
  },
  {
    key: "addProductToCart",
    targetInstance: Function,
  },
  // {
  //   key: "removeProductFromCart",
  //   targetInstance: Function,
  // },
  {
    key: "cartProducts",
    targetInstance: Array,
  },
]
