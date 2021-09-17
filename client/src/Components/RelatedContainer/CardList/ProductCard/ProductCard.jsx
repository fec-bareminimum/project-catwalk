import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import StarRating from "react-bootstrap-star-rating"
import useProducts from "../../../../contexts/ProductsContext.jsx"
import useReviews from "../../../../contexts/ReviewsContext.jsx"
import {
  getAverageRating,
  extractPriceString,
  extractThumbnailLink,
  extractSalesPrice,
  formatPriceStr,
} from "./helpers"

const ProductCard = (props) => {
  const { updateDisplayedProduct } = useProducts()
  const { reviews } = useReviews()

  /* ******************************************************************
  // Fetch more complete details for this product
  useEffect(() => {
    if (!props["styles"]) {
      // fetch product styles (/api/product/:productId/styles)
    }
  }, [])
  ****************************************************************** */

  const handleClick = () => {
    updateDisplayedProduct(props)
  }

  const currentStyleObj = ((props.styles || {}).results || [])[0]
  const defaultPrice = formatPriceStr(extractPriceString(props))
  const salePrice = extractSalesPrice(currentStyleObj)
  const strikeThroughStyles = { textDecoration: "line-through", color: "red" }

  return (
    <Card style={{ width: "18rem" }} className="productCard">
      <Card.Img variant="top" src={extractThumbnailLink(props)} />
      <Card.Body onClick={handleClick}>
        <Card.Subtitle>{props.category}</Card.Subtitle>
        <Card.Title>{props.name}</Card.Title>

        {salePrice ? (
          <Card.Subtitle>
            {formatPriceStr(salePrice)}
            <span style={strikeThroughStyles}>{defaultPrice}</span>
          </Card.Subtitle>
        ) : (
          <Card.Subtitle>{defaultPrice}</Card.Subtitle>
        )}

        <Card.Subtitle>
          <StarRating
            defaultValue={getAverageRating(reviews)}
            min={0}
            max={5}
            step={0.25}
          />
        </Card.Subtitle>
        {React.createElement(props.ActionBtn, { thisProduct: props })}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
