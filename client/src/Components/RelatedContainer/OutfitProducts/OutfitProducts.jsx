import React from "react"
import CardList from "../CardList/CardList.jsx"
import useCart from "../../../contexts/CartContext.jsx"
// import RemoveButton from "./RemoveButton/RemoveButton.jsx"
const RemoveButton = () => <button>p</button>
const OutfitProducts = () => {
  const { cartProducts } = useCart()

  return (
    <section className="outfitProductsContainer">
      <CardList
        products={cartProducts}
        listTitle={"YOUR OUTFIT"}
        ActionBtn={RemoveButton}
      />
    </section>
  )
}

export default OutfitProducts
