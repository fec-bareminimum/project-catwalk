import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import useReviews from "../../../../contexts/ReviewsContext.jsx"

const Characteristics = () => {
  const { reviewMetadata, details } = useReviews()
  const [chars, setChars] = useState({})
  const [characteristics, setCharacteristics] = useState({})

  return Object.keys(reviewMetadata.characteristics).map((char, i) => (
    <Form.Group key={i}>
      <Form.Label>{`${char}*`}</Form.Label>
      <Container>
        <Row>
          <Col>
            {chars[reviewMetadata.characteristics[char].id] ? (
              <Form.Label>
                {details[char][chars[reviewMetadata.characteristics[char].id] - 1]}
              </Form.Label>
            ) : (
              <Form.Label>None selected</Form.Label>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {[1, 2, 3, 4, 5].map((rating, i) => (
              <Form.Check
                required
                inline
                key={`${char}-${rating}`}
                label={rating}
                type="radio"
                name={char}
                onChange={() => {
                  setChars({
                    ...chars,
                    [reviewMetadata.characteristics[char].id]: rating,
                  })
                  // something to set
                }}
                style={{ float: "right" }}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Text style={{ float: "right" }}>{details[char][0]}</Form.Text>
          </Col>
          <Col>
            <Form.Text style={{ float: "right" }}>{details[char][4]}</Form.Text>
          </Col>
        </Row>
      </Container>
    </Form.Group>
  ))
}

export default Characteristics
