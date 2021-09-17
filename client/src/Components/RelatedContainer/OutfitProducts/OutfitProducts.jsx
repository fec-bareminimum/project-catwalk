import React from "react"
import CardList from "../CardList/CardList.jsx"
import useCart from "../../../contexts/CartContext.jsx"
import useProducts from "../../../contexts/ProductsContext.jsx"
import PlusIcon from "./PlusIcon.jsx"
import RemoveButton from "./RemoveButton/RemoveButton.jsx"

const AddToOutfitBtn = ({ handleClick }) => {
  return (
    <button className="addToCard" onClick={handleClick}>
      <PlusIcon />
      Add To Outfit
    </button>
  )
}

const OutfitProducts = () => {
  const { displayedProduct } = useProducts()
  const { cartProducts, addProductToCart } = useCart()

  const handleAddClick = () => {
    const alreadyInCart = cartProducts.some(
      (productObj) => productObj["id"] === displayedProduct["id"]
    )
    if (alreadyInCart === false) {
      addProductToCart(displayedProduct)
    }
  }

  return (
    <section className="outfitProductsContainer">
      <AddToOutfitBtn handleClick={handleAddClick} />
      <CardList
        products={cartProducts}
        listTitle={"YOUR OUTFIT"}
        ActionBtn={RemoveButton}
      />
    </section>
  )
}

export default OutfitProducts
