import React from "react"
import { render, screen } from "../test-utils.jsx"
import useProducts, { ProductsContext } from "./ProductsContext.jsx"

describe("ProductsContext", () => {
  test("passes correct values to children", () => {
    const MockChild = () => {
      const productExports = useProducts()
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

    render(<MockChild />)
  })
})

const expectedExports = [
  {
    key: "productList",
    targetInstance: Array,
  },
  {
    key: "relatedProducts",
    targetInstance: Array,
  },
  {
    key: "selectedStyleIndex",
    targetInstance: Number,
  },
  {
    key: "displayedProduct",
    targetInstance: Object,
  },
  {
    key: "updateDisplayedProduct",
    targetInstance: Function,
  },
  {
    key: "fetchProductInfo",
    targetInstance: Function,
  },
  {
    key: "fetchProductStyles",
    targetInstance: Function,
  },
  {
    key: "fetchProductRelatedIds",
    targetInstance: Function,
  },
  {
    key: "changeSelectedStyleIndex",
    targetInstance: Function,
  },
]
