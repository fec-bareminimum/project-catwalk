import React, { useState, useEffect } from "react"
import useProducts from "../../../../contexts/ProductsContext.jsx"

const generateComparisonsObj = (productA, productB) => {
  const comparisons = {}
  const featuresArray = [
    {
      featuresObj: productA["features"],
      productKey: "productA",
    },
    {
      featuresObj: productB["features"],
      productKey: "productB",
    },
  ]

  featuresArray.forEach(({ featuresObj, productKey }) => {
    if (featuresObj) {
      featuresObj.forEach(({ feature, value }) => {
        if (comparisons[feature] === undefined) {
          comparisons[feature] = {}
        }
        comparisons[feature][productKey] = value
      })
    }
  })

  return comparisons
}

const ProductComparison = ({ productToCompare, handleClick }) => {
  const { displayedProduct, fetchProductInfo } = useProducts()
  const [comparisonsObj, setComparisonsObj] = useState({})

  // Generate a comparison object
  useEffect(() => {
    if (displayedProduct && productToCompare) {
      setComparisonsObj(generateComparisonsObj(displayedProduct, productToCompare))
    }
  }, [displayedProduct, productToCompare])

  useEffect(() => {
    if (displayedProduct && displayedProduct["features"] === undefined) {
      fetchProductInfo(displayedProduct)
    }
    if (productToCompare && productToCompare["features"] === undefined) {
      fetchProductInfo(productToCompare)
    }
  }, [])

  const hasValidProducts = displayedProduct && productToCompare
  return (
    <figure className="comparisonFigure" onClick={handleClick}>
      <h3>COMPARING</h3>
      {hasValidProducts && (
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
            {Object.keys(comparisonsObj).length > 0 &&
              Object.keys(comparisonsObj).map((featureName) => {
                const featureObj = comparisonsObj[featureName]

                return (
                  <tr key={featureName}>
                    <td>
                      {featureObj["productA"] !== undefined && <p>&#10003;</p>}
                    </td>
                    <td>{featureName}</td>
                    <td>
                      {featureObj["productB"] !== undefined && <p>&#10003;</p>}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
    </figure>
  )
}

export default ProductComparison
