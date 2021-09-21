import React, { useState } from "react"
import {
  Image,
  Row,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap"
import ProductStyleThumb from "./ProductStyleThumb.jsx"
import ProductForm from "./ProductForm.jsx"
import ProductDetails from "./ProductDetails.jsx"
import Star from "./ProductStar.jsx"
import Share from "./Share.jsx"
import uniqid from "uniqid"
import Stylesheet from "../styles.css"

function ProductThumbRight(props) {
  return (
    <div>
      <Row>
        <Col>
          <div className="sameline">
            <Star />
            <span className="reviews">Read All Reviews</span>
          </div>
        </Col>
      </Row>
      <div className="productCategory">{props.infoData.category}</div>
      <Col xs={8}>
        <h1 className="productTitle">{props.infoData.name}</h1>
      </Col>
      <Row>
        <p className="productDetail">
          {props.selectedStyle && props.selectedStyle.sale_price !== null
            ? props.selectedStyle &&
              props.selectedStyle.sale_price && (
                <s className="redStrike">{props.selectedStyle.original_price}</s>
              )
            : props.selectedStyle && props.selectedStyle.original_price}
        </p>
      </Row>
      <div className="productDetail">
        {" "}
        <b> STYLES </b>
        {props.selectedStyle && props.selectedStyle.name !== null ? (
          props.selectedStyle.name
        ) : (
          <p> No style selected</p>
        )}
      </div>
      <Row className="flex-row">
        <div className="mr-2">
          {props.stylesData.length > 0 &&
            props.stylesData.map((item) => {
              return (
                <ProductStyleThumb
                  selectedStyle={props.selectedStyle}
                  updateStyle={props.updateStyle}
                  name={item.name}
                  item={item.photos[0].thumbnail_url}
                  id={item.style_id}
                  key={uniqid()}
                />
              )
            })}
        </div>
      </Row>
      <ProductForm
        selectedStyle={props.selectedStyle}
        stylePhotos={props.stylePhotos}
        stylesData={props.styleList}
        infoData={props.info}
        setStyle={props.updateStyleHandler}
      />
      <br></br>
      <h4 className="social">Share on social media</h4>
      <div className="App">
        <Share />
      </div>
      <Row></Row>
    </div>
  )
}

export default ProductThumbRight
