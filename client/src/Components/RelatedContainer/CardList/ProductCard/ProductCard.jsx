import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import Placeholder from "react-bootstrap/Placeholder"
import StarRating from "react-star-ratings"
import useProducts from "../../../../contexts/ProductsContext.jsx"
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
  const [styleShownIndex, setStyleShownIndex] = useState(0)

  // useEffect(() => {
  //   if (!props["name"] && fetchProductInfo) {
  //     // fetchProductInfo(props["id"])
  //     console.log("I need to fetch details")
  //   }
  //   if (!props["styles"] && fetchProductStyles) {
  //     // fetchProductStyles(props["id"])
  //     console.log("I need to fetch styles")
  //   }
  // }, [props])

  useEffect(() => {
    if (!props["name"] && fetchProductInfo) {
      fetchProductInfo(props["id"])
      console.log("I need to fetch details")
    }
  }, [props["name"]])

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
        alt={props.name || "Product Thumbnail"}
        style={{ height: "15rem", width: "14.9rem", background: "#eaeaea" }}
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
              rating={getAverageRating(props.ratings)}
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
