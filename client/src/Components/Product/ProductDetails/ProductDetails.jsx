/* eslint-disable react/jsx-key */
import React from "react"
import { Image, Row, Col } from "react-bootstrap"
import Star from "./ProductStar.jsx"
import Stylesheet from "../styles.css"

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
              alt="thumb"
              roundedCircle
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default ProductDetails
