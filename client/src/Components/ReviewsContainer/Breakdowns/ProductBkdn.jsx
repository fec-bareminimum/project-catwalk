import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ProductBkdn = () => {
  const { reviewMetadata } = useReviews()
  const [chars, setChars] = useState([])

  useEffect(() => {
    let flattened = []
    for (const char in reviewMetadata.characteristics) {
      flattened.push({ [char]: reviewMetadata.characteristics[char] })
    }
    setChars(flattened)
  }, [reviewMetadata])

  const Scale = (props) => (
    <Row>
      <Col>
        <h5>{props.size}</h5>
      </Col>
    </Row>
  )

  return (
    <Container className="productBkdn">
      {/* {count > 0
        ?
      } */}
    </Container>
  )
}

export default ProductBkdn
