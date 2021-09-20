import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const MoreAddBtns = (props) => {
  const { reviews } = useReviews()

  return (
    <Container className="buttons">
      <Row>
        <Col>
          <Button
            className="more"
            onClick={() => {
              props.showMore()
            }}
          >
            More Reviews
          </Button>
        </Col>
        {/* <Col>
            <Button className="add">Add a Review</Button>
          </Col> */}
      </Row>
    </Container>
  )
}

export default MoreAddBtns
