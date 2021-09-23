import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import Placeholder from "react-bootstrap/Placeholder"
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
  const { reviews } = useReviews()
  const [styleShownIndex, setStyleShownIndex] = useState(0)

  useEffect(() => {
    if (!props["id"] && fetchProductInfo) {
      return fetchProductInfo(props["id"])
    }
  }, [props["name"]])

  useEffect(() => {
    if (!props["styles"] && fetchProductStyles) {
      return fetchProductStyles(props["id"])
    }
  }, [props["styles"]])

  const handleClick = () => {
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
        style={{ height: "15rem" }}
        src={extractThumbnailLink(props, styleShownIndex)}
      />

      {props.name ? (
        <Card.Body onClick={handleClick}>
          <Card.Subtitle>{props.category}</Card.Subtitle>
          <Card.Subtitle>{props.name}</Card.Subtitle>

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
              rating={getAverageRating(reviews)}
              starDimension="15px"
              starSpacing="0"
            />
          </Card.Subtitle>
          <ActionBtn thisProduct={props} />
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
    </Card>
  )
}

export default ProductCard
