import React from "react"
import useProducts from "../../../../contexts/ProductsContext.jsx"

const ProductComparison = ({ productToCompare }) => {
  const { displayProduct } = useProducts()

  return <figure className="comparisonFigure"></figure>
}

export default ProductComparison
