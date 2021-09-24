import React, { useState, useEffect } from "react"
import { Container, Row, Col, Form } from "react-bootstrap"
import useReviews from "../../../../contexts/ReviewsContext.jsx"

const Characteristics = (props) => {
  const { reviewMetadata, details } = useReviews()
  const [chars, setChars] = useState({})

  useEffect(() => {
    props.submitData({ characteristics: chars })
  }, [chars])

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
            {[5, 4, 3, 2, 1].map((rating, i) => (
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
