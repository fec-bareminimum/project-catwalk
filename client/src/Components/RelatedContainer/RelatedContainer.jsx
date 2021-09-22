import React from "react"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import { Container } from "react-bootstrap"
import RelatedProducts from "./RelatedProducts/RelatedProducts.jsx"
import OutfitProducts from "./OutfitProducts/OutfitProducts.jsx"

const RelatedContainer = () => {
  return (
    <Container className="relatedContainer">
      <RelatedProducts />
      <OutfitProducts />{" "}
    </Container>
  )
}

export default useClickLogger(RelatedContainer, "Related Items & Comparison")
