import React from "react"
import useProducts from "../../../../contexts/ProductsContext.jsx"

const ProductComparison = ({ productToCompare }) => {
  const { displayProduct } = useProducts()

  return (
    <figure className="comparisonFigure">
      <h3>COMPARING</h3>
      {/* <table>
      <thead
    </table> */}
    </figure>
  )
}

export default ProductComparison
