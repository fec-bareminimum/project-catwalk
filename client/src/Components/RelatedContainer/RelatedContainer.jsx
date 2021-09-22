import React from "react"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import { Container } from "react-bootstrap"
import RelatedProducts from "./RelatedProducts/RelatedProducts.jsx"
import OutfitProducts from "./OutfitProducts/OutfitProducts.jsx"
import { OutfitProvider } from "../../contexts/OutfitContext.jsx"
import { ReviewsProvider } from "../../contexts/ReviewsContext.jsx"

const RelatedContainer = () => {
  return (
    <OutfitProvider>
      <Container className="relatedContainer">
        <RelatedProducts />
        <OutfitProducts />{" "}
      </Container>
    </OutfitProvider>
  )
}

export default useClickLogger(RelatedContainer, "Related Items & Comparison")
