import React, { useState } from "react"
import useCart from "../../../../contexts/CartContext.jsx"
import RemoveIcon from "./RemoveIcon.jsx"

const RemoveButton = ({ product }) => {
  const { removeProductFromCart } = useCart()

  const handleClick = () => {
    removeProductFromCart(product)
  }

  return (
    <button className="actionBtn" onClick={handleClick}>
      <RemoveIcon />
    </button>
  )
}

export default RemoveButton
