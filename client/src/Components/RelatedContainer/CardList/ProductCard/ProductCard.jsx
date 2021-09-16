import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import useProducts from "../../../../contexts/ProductsContext.jsx"

const placeholderImg =
  "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081"

const ProductCard = (props) => {
  const { updateDisplayedProduct } = useProducts()

  /* ******************************************************************
  // Fetch more complete details for this product
  useEffect(() => {
    if (!props["styles"]) {
      // fetch product styles (/api/product/:productId/styles)
    }
  }, [])

  const extractThumbnailLink = (props) => {
    try {
      const imageUrl = props["styles"][productStyleIndex].photos[0].thumbnail_url
      return imageUrl
    } catch {
      return ""
    }
  }

  const extractSalesPrice = (props) => {
    try {
      const imageUrl = props["styles"][productStyleIndex].sale_price
      return imageUrl
    } catch {
      return ""
    }
  }
  ****************************************************************** */

  const handleClick = () => {
    updateDisplayedProduct(props)
  }

  // 140.00 (integer) => "$140" (string)
  const formattedPrice = Number(props["default_price"]).toFixed(0).toLocaleString()
  const formattedPriceStr = `$${formattedPrice}`

  return (
    <Card style={{ width: "18rem" }} className="productCard">
      <Card.Img variant="top" src={placeholderImg} />
      <Card.Body onClick={handleClick}>
        <Card.Subtitle>{props.category}</Card.Subtitle>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle>{formattedPriceStr}</Card.Subtitle>
        {React.createElement(props.ActionBtn, { thisProduct: props })}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
