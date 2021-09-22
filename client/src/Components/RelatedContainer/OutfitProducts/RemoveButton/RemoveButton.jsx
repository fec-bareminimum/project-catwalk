import React, { useState } from "react"
import useOutfit from "../../../../contexts/OutfitContext.jsx"
import RemoveIcon from "./RemoveIcon.jsx"
import styled from "styled-components"

const ButtonWrapper = styled.button`
  position: absolute;
  top: 0;
  right: 0.5em;
  padding: 0;
  border-radius: 50%;
  background: transparent;
`

const RemoveButton = ({ thisProduct }) => {
  const { removeProductFromOutfit } = useOutfit()

  const handleClick = () => {
    removeProductFromOutfit(thisProduct)
  }

  return (
    <ButtonWrapper className="actionBtn" onClick={handleClick}>
      <RemoveIcon />
    </ButtonWrapper>
  )
}

export default RemoveButton
