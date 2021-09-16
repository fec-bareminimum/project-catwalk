import React from "react"
import CardList from "../CardList/CardList.jsx"
import useProducts from "../../../contexts/ProductsContext.jsx"
import StarIcon from "./StarIcon/StarIcon.jsx"

const RelatedProducts = () => {
  const { productList } = useProducts()

  // will access the state for products in PRODUCTS
  // will render the card list for that array

  const ActionBtn = ({ thisProduct, displayedProduct }) => (
    <button className="actionBtn">
      <StarIcon />
    </button>
  )

  return (
    <section className="relatedProductsContainer">
      <CardList
        products={productList}
        listTitle={"RELATED PRODUCTS"}
        ActionBtn={ActionBtn}
      />
    </section>
  )
}

export default RelatedProducts
