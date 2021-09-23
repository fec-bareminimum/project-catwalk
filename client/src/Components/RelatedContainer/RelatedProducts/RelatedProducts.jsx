import React, { useState, useEffect } from "react"
import CardList from "../CardList/CardList.jsx"
import useProducts from "../../../contexts/ProductsContext.jsx"
import StarButton from "./StarButton/StarButton.jsx"
import styled from "styled-components"

const Section = styled.section`
  margin-top: 2em;
  margin-bottom: 2em;
`

const RelatedProducts = () => {
  const { relatedProductIds, productList, fetchProductInfo, fetchProductStyles } =
    useProducts()

  // Map the list of IDs to complete product objects
  const relatedDetails = relatedProductIds.map(
    (ID) =>
      productList[productList.map((e) => parseInt(e.id)).indexOf(parseInt(ID))] || {
        id: ID,
      }
  )

  return (
    <Section className="relatedProductsContainer">
      <CardList
        products={relatedDetails}
        listTitle={"RELATED PRODUCTS"}
        ActionBtn={StarButton}
      />
    </Section>
  )
}

export default RelatedProducts
