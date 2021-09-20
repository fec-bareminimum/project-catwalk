/* eslint-disable react/jsx-key */
import React from "react"
import { Image, Row, Col } from "react-bootstrap"
import Star from "./ProductStar.jsx"

function ProductDetails(props) {
  return (
    <div>
      <Row xs="auto">
        {props.item.photos.map((photo, index) => (
          <Col>
            <Image
              key={index}
              className="thumbnail"
              src={photo.thumbnail_url}
              roundedCircle
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default ProductDetails
