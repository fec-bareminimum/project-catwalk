import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import RatingBreakdown from "./Breakdowns/RatingBreakdown.jsx"
import ReviewList from "./List/ReviewList.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

const ReviewsContainer = () => {
  return (
    <Container className="reviews">
      <Row>
        <Col xs={2} md={4}>
          <h4>Ratings &#38; reviews</h4>
          <RatingBreakdown />
        </Col>
        <Col xs={4} md={8}>
          <ReviewList />
        </Col>
      </Row>
    </Container>
  )
}

export default useClickLogger(ReviewsContainer, "Ratings & Reviews")
