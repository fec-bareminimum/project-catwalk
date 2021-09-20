import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import Breakdowns from "./Breakdowns/Breakdowns.jsx"
import List from "./List/List.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

const ReviewsContainer = () => {
  return (
    <Container className="reviews">
      <h4>Ratings &#38; reviews</h4>
      <Row>
        <Col xs={2} md={4}>
          <Breakdowns />
        </Col>
        <Col xs={4} md={8}>
          <List />
        </Col>
      </Row>
    </Container>
  )
}

export default useClickLogger(ReviewsContainer, "Ratings & Reviews")
