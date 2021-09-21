import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
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
      {reviews ? <Sorter /> : null}
      {reviews ? <Tiles /> : null}
    </Container>
  )
}

export default ReviewList
