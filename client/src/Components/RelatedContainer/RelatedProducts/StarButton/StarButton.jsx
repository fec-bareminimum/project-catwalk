import React, { useState } from "react"
import ProductComparison from "../ProductComparison/ProductComparison.jsx"
import StarIcon from "./StarIcon.jsx"
import styled from "styled-components"

const ButtonWrapper = styled.button`
  position: absolute;
  top: 0;
  right: 0.5em;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
`

const StarButton = ({ thisProduct, handleClick }) => {
  const [displayComparison, setDisplayComparison] = useState(false)

  const togglePopup = () => {
    setDisplayComparison((prevBool) => !prevBool)
  }

  return (
    <>
      {displayComparison ? (
        <ProductComparison
          handleClick={togglePopup}
          productToCompare={thisProduct}
        />
      ) : (
        <ButtonWrapper className="actionBtn" onClick={togglePopup}>
          <StarIcon />
        </ButtonWrapper>
      )}
    </>
  )
}

export default StarButton
