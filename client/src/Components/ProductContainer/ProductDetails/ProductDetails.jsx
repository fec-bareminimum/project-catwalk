import React from "react"
import { Row, Col } from "react-bootstrap"
import RightThumbOverlay from "./RightThumbOverlay.jsx"
import ProductForm from "./ProductForm.jsx"
import Star from "./ProductStar.jsx"
import ShareSocial from "./ShareSocial.jsx"
import uniqid from "uniqid"
import Stylesheet from "../styles.css"

function ProductDetails(props) {
  return (
    <div>
      <Row>
        <Col>
          <div className="sameline">
            <Star id={props.infoData.id} />
            <a className="reviews" href="#ratings-reviews">
              Read All Reviews
            </a>
          </div>
        </Col>
      </Row>
      <div className="productCategory">{props.infoData.category}</div>
      <Col xs={8}>
        <h1 className="productTitle">{props.infoData.name}</h1>
      </Col>
      <Row>
        <div className="productDetail styleText ">
          {props.selectedStyle && props.selectedStyle.sale_price !== null
            ? props.selectedStyle &&
              props.selectedStyle.sale_price && (
                <>
                  <span>
                    <s className="redStrike styleText">
                      {props.selectedStyle.original_price}
                    </s>
                  </span>
                  <span className="styleText">
                    {" "}
                    {props.selectedStyle.sale_price}
                  </span>{" "}
                </>
              )
            : props.selectedStyle && (
                <div className="styleText">{props.selectedStyle.original_price}</div>
              )}
        </div>
      </Row>
      <div className="productDetail">
        {" "}
        <b className="styleBold">STYLE</b>
        {props.selectedStyle && props.selectedStyle.name !== null ? (
          props.selectedStyle.name
        ) : (
          <p> No style selected</p>
        )}
      </div>
      <Row className="flex-row">
        <div>
          {props.stylesData.length > 0 &&
            props.stylesData.map((item) => {
              return (
                <RightThumbOverlay
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
        setStyle={props.setStyle}
      />
      <h4 className="social">Share on social media</h4>
      <div className="App">
        <ShareSocial />
      </div>
    </div>
  )
}

export default ProductDetails
