import React, { useState } from "react"
import CardList from "../CardList/CardList.jsx"
import useProducts from "../../../contexts/ProductsContext.jsx"
import StarButton from "./StarButton/StarButton.jsx"

const RelatedProducts = () => {
  const { relatedProducts, productList, fetchProductInfo, fetchProductStyles } = useProducts()
  const [relatedDetails, setRelatedDetails] = useState([])

  // Convert "relatedProducts" (list of IDS) to array of product objects
  useEffect(() => {
    if (relatedProducts && relatedProducts.length && productList && productList.length) {
      const newRelated = []
      relatedProducts.forEach((productID) => {
        const existingIndex = productList.map((e) => e.id).indexOf(productID.toString())

        if (existingIndex) {
          newRelated.push(productList[existingIndex])
        } else {
          // This object is not even in the app state
          fetchProductInfo(productID)
          fetchProductStyles(productID)
        }
      })
      setRelatedDetails(newRelated)
    }
  }, [relatedProducts, productList])

  return (
    <section className="relatedProductsContainer">
      <CardList
        products={relatedDetails}
        listTitle={"RELATED PRODUCTS"}
        ActionBtn={StarButton}
      />
    </section>
  )
}

export default RelatedProducts
