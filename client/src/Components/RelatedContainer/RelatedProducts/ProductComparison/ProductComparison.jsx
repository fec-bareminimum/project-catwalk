import React from "react"
import useProducts from "../../../../contexts/ProductsContext.jsx"

const ProductComparison = ({ productToCompare }) => {
  const { displayedProduct } = useProducts()

  const comparisons = {}

  const productAFeatures = displayedProduct["features"]
  for (const characteristic in productAFeatures) {
    if (comparisons[characteristic] === undefined) {
      comparisons[characteristic] = {}
    }
    comparisons[characteristic]["productA"] = productAFeatures[characteristic]
  }

  const productBFeatures = productToCompare["features"]
  for (const characteristic in productBFeatures) {
    if (comparisons[characteristic] === undefined) {
      comparisons[characteristic] = {}
    }
    comparisons[characteristic]["productB"] = productBFeatures[characteristic]
  }

  return (
    <figure className="comparisonFigure">
      <h3>COMPARING</h3>
      <table>
        <thead>
          <tr>
            <th>
              <h4>{displayedProduct["name"]}</h4>
            </th>
            <th></th>
            <th>
              <h4>{productToCompare["name"]}</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
        </tbody>
      </table>
    </figure>
  )
}

export default ProductComparison
