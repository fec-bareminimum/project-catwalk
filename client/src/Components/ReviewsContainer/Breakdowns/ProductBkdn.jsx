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
        <h5>{Object.keys(props.char)[0]}</h5>
        <input type="range" max="5" value={props.char.value} disabled></input>
      </Col>
    </Row>
  )

  return (
    <Container className="productBkdn">
      {chars.length > 0
        ? chars.map((char, i) => <Scale key={i} char={char} />)
        : null}
    </Container>
  )
}

export default ProductBkdn
