import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ReviewTile from "./ReviewTile.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ReviewList = (props) => {
  const { reviews, fetchReviews } = useReviews()
  const [page, setPage] = useState(1) // based on list length/scroll
  const [count, setCount] = useState(2) // based on list length/scroll
  const [sort, setSort] = useState("relevant") // based on sort
  const [product_id, setProduct_id] = useState(42367)

  const [tiles, setTiles] = useState([]) // temp fix? reviews broken

  useEffect(() => {
    fetchReviews(page, count, sort, product_id, (data) => {
      setTiles(
        data.results.map((review) => (
          <Row key={review.review_id}>
            <Col>
              <ReviewTile {...review} />
            </Col>
          </Row>
        ))
      )
    })
  }, [page, count, sort, product_id])

  return <Container className="reviewList">{tiles}</Container>
}

export default ReviewList
