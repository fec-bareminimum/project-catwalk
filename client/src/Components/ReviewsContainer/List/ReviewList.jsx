import React from "react"
import { Container, Row, Col, Form } from "react-bootstrap"
import ReviewTile from "./ReviewTile.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const listStyle = {
  maxHeight: "85vh",
  overflow: "auto",
}

const ReviewList = (props) => {
  const { reviews } = useReviews()

  const Sorter = () => (
    <Row>
      <Col>
        <h4>{`${reviews.length} reviews, sorted by`}</h4>
      </Col>
      <Col>
        <Form.Select
          size="sm"
          onChange={(e) => {
            props.sortReviews(e.target.value)
          }}
        >
          <option value="relevant">Most relevant</option>
          <option value="helpful">Most helpful</option>
          <option value="newest">Most recent</option>
        </Form.Select>
      </Col>
    </Row>
  )

  const Tiles = () =>
    reviews
      .slice(0, props.listLength)
      .map((review) => <ReviewTile key={review.review_id} {...review} />)

  return (
    <Container className="reviewList" style={listStyle}>
      <Sorter />
      {reviews.length > 0 ? <Tiles /> : "No reviews have been posted yet!"}
    </Container>
  )
}

export default ReviewList
