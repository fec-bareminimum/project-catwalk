import React from "react"
import RelatedProducts from "./RelatedProducts/RelatedProducts.jsx"
import OutfitProducts from "./OutfitProducts/OutfitProducts.jsx"

const RelatedContainer = () => {
  return (
    <div className="relatedContainer">
      <RelatedProducts />

      <OutfitProducts />
    </div>
  )
}

export default RelatedContainer
