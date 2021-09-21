import React, { useState, useEffect } from "react"
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
  const { reviewMetadata } = useReviews()
  const [chars, setChars] = useState([])
  const [details, setDetails] = useState({
    Size: ["Too small", "Too large"],
    Width: ["Too narrow", "Too wide"],
    Comfort: ["Not at all comfy", "As comfy as can be"],
    Quality: ["Poor", "Great"],
    Length: ["Too short", "Too long"],
    Fit: ["Lacking", "Perfect"],
  })

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
        <input
          type="range"
          max="5"
          value={props.char.value}
          disabled
          style={{ width: "100%" }}
        ></input>
        <div style={{ float: "left" }}>{details[Object.keys(props.char)[0]][0]}</div>
        <div style={{ float: "right" }}>
          {details[Object.keys(props.char)[0]][1]}
        </div>
      </Col>
    </Row>
  )

  return (
    <Container className="productBkdn">
      {chars.length > 0
        ? chars.map((char, i) => <Scale key={i} char={char} style={scaleStyle} />)
        : null}
    </Container>
  )
}

export default ProductBkdn
