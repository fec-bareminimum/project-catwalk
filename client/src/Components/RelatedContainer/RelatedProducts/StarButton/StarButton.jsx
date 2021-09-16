import React, { useState } from "react"
import ProductComparison from "../ProductComparison/ProductComparison.jsx"
import StarIcon from "./StarIcon.jsx"

const StarButton = ({ thisProduct, handleClick }) => {
  const [displayComparison, setDisplayComparison] = useState(false)

  const togglePopup = () => {
    setDisplayComparison((prevBool) => !prevBool)
  }

  return (
    <React.Fragment>
      {displayComparison ? (
        <ProductComparison
          handleClick={togglePopup}
          productToCompare={thisProduct}
        />
      ) : (
        <button className="actionBtn" onClick={togglePopup}>
          <StarIcon />
        </button>
      )}
    </React.Fragment>
  )
}

export default StarButton
