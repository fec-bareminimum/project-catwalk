import React from "react"
import { Container, Row, Col, Form } from "react-bootstrap"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ProductBkdn = () => {
  const { reviewMetadata, details } = useReviews()

  const Scale = (props) => (
    <Row>
      <Col>
        <h5>{props.char}</h5>
        <Form.Range
          max="5"
          value={props.value}
          disabled
          style={{ width: "100%" }}
        ></Form.Range>
        <div style={{ float: "left" }}>{details[props.char][0]}</div>
        <div style={{ float: "right" }}>{details[props.char][4]}</div>
      </Col>
    </Row>
  )

  return (
    <Container className="productBkdn">
      {reviewMetadata.characteristics && details
        ? Object.keys(reviewMetadata.characteristics).map((char, i) => (
            <Scale key={i} char={char} {...reviewMetadata.characteristics[char]} />
          ))
        : null}
    </Container>
  )
}

export default ProductBkdn
