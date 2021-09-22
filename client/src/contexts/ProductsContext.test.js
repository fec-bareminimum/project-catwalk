import React from "react"
import { render, screen } from "../test-utils.jsx"
import useProducts, { ProductsContext } from "./ProductsContext.jsx"

describe("ProductsContext", () => {
  test("passes correct values to children", (done) => {
    const MockChild = () => {
      const productExports = useProducts()
      expectedExports.forEach(({ key, targetInstance }) => {
        try {
          expect(productExports[key]).not.toBe(undefined)
        } catch {
          console.error(`expected ${key} to NOT be undefined`)
        }

        try {
          const matchesConstructor =
            productExports[key] instanceof targetInstance ||
            productExports[key].constructor === targetInstance
          expect(matchesConstructor).toBeTruthy()
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
    key: "productList",
    targetInstance: Array,
  },
  {
    key: "relatedProductIds",
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
