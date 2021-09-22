import React, { useState } from "react"
import useOutfit from "../../../../contexts/OutiftContext.jsx"
import RemoveIcon from "./RemoveIcon.jsx"

const RemoveButton = ({ product }) => {
  const { removeProductFromOutfit } = useOufit()

  const handleClick = () => {
    removeProductFromOutfit(product)
  }

  return (
    <button className="actionBtn" onClick={handleClick}>
      <RemoveIcon />
    </button>
  )
}

export default RemoveButton
