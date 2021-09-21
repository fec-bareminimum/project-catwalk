import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const scaleStyle = {
  display: "flex",
  justifyContent: "space-between",
}

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
            <Scale
              key={i}
              char={char}
              {...reviewMetadata.characteristics[char]}
              style={scaleStyle}
            />
          ))
        : null}
    </Container>
  )
}

export default ProductBkdn
