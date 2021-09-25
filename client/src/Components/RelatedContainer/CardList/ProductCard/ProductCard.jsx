import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import { Placeholder } from "react-bootstrap"
import StarRating from "react-star-ratings"
import useProducts from "../../../../contexts/ProductsContext.jsx"
import useReviews from "../../../../contexts/ReviewsContext.jsx"
import {
  getAverageRating,
  extractPriceString,
  extractThumbnailLink,
  extractSalesPrice,
  formatPriceStr,
} from "./helpers"
import Img from "react-cool-img"

const ProductCard = (props) => {
  const {
    updateDisplayedProduct,
    displayedProduct,
    fetchProductInfo,
    fetchProductStyles,
    selectedStyleIndex,
  } = useProducts()
  const { getAverageRating } = useReviews()
  const [styleShownIndex, setStyleShownIndex] = useState(0)

  useEffect(() => {
    if (!props["name"] && fetchProductInfo) {
      fetchProductInfo(props["id"])
    }
  }, [props["name"]])

  const handleClick = (e) => {
    e.preventDefault()
    updateDisplayedProduct(props)
  }

  const defaultPrice = formatPriceStr(extractPriceString(props))
  const salePrice = extractSalesPrice(displayedProduct, selectedStyleIndex)
  const strikeThroughStyles = { textDecoration: "line-through", color: "red" }

  const ActionBtn = props.ActionBtn
  return (
    <Card
      style={{ width: "15rem", border: "1px solid black" }}
      className="productCard"
    >
      <Img
        variant="top"
        alt={props.name || "Product Thumbnail"}
        style={{ height: "15rem", width: "14.9rem", background: "#eaeaea" }}
        src={extractThumbnailLink(props, styleShownIndex)}
      />

      {props.name ? (
        <Card.Body onClick={handleClick}>
          <Card.Subtitle style={{ color: "rgb(118 115 120)" }}>
            {props.category}
          </Card.Subtitle>
          <Card.Subtitle style={{ color: "#28242B" }}>{props.name}</Card.Subtitle>

          {salePrice ? (
            <Card.Subtitle style={{ color: "rgb(22 130 99)" }}>
              {formatPriceStr(salePrice)}
              <span style={strikeThroughStyles}>{defaultPrice}</span>
            </Card.Subtitle>
          ) : (
            <Card.Subtitle style={{ color: "rgb(22 130 99)" }}>
              {defaultPrice}
            </Card.Subtitle>
          )}

          <Card.Subtitle>
            <StarRating
              rating={getAverageRating(props.id)}
              starDimension="15px"
              starSpacing="0"
            />
          </Card.Subtitle>
        </Card.Body>
      ) : (
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} />
          </Placeholder>
        </Card.Body>
      )}
      <ActionBtn thisProduct={props} />
    </Card>
  )
}

export default ProductCard
