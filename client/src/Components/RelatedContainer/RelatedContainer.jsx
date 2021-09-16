import React from "react"
import useClickLogger from "../../hooks/useClickLogger.jsx"
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

export default useClickLogger(RelatedContainer, "Related Items & Comparison")
