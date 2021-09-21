/* eslint-disable react/jsx-key */
//renders and css styles with
import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import uniqid from "uniqid"

function ProductDescription(props) {
  return (
    <div>
      <Row className="mt-5 p-2 rowPad">
        <Col md={8}>
          <h3>{props.productInfo.slogan}</h3>
          <br></br>
          <p>{props.productInfo.description}</p>
        </Col>
        <Col md="auto" className="descriptionList">
          {props.productInfo.features &&
            props.productInfo.features.map((item) => (
              <li className="features" key={uniqid()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check2 r-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
                {item.feature}
              </li>
            ))}
        </Col>
      </Row>
    </div>
  )
}

export default ProductDescription
