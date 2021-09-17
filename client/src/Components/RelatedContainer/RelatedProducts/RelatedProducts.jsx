import React from "react"
import CardList from "../CardList/CardList.jsx"
import useProducts from "../../../contexts/ProductsContext.jsx"
import StarButton from "./StarButton/StarButton.jsx"

const RelatedProducts = () => {
  const { relatedProducts } = useProducts()

  return (
    <section className="relatedProductsContainer">
      <CardList
        products={productList}
        listTitle={"RELATED PRODUCTS"}
        ActionBtn={StarButton}
      />
    </section>
  )
}

export default RelatedProducts
