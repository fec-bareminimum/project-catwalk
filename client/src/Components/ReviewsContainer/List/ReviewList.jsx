import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ReviewTile from "./ReviewTile.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ReviewList = (props) => {
  const { reviews, fetchReviews } = useReviews()
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(2)
  const [sort, setSort] = useState("relevant") // based on sort
  const [product_id, setProduct_id] = useState(42367)
  const [tiles, setTiles] = useState([])
  const [next, setNext] = useState([])

  // create first set of tiles
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
      setPage(page + 1)
    })
  }, [count, sort, product_id])

  // create next sets of tiles
  useEffect(() => {
    fetchReviews(page, count, sort, product_id, (data) => {
      setNext(
        data.results.map((review) => (
          <Row key={review.review_id}>
            <Col>
              <ReviewTile {...review} />
            </Col>
          </Row>
        ))
      )
    })
  }, [page])

  const more = () => {
    if (next.length > 0) {
      return (
        <Button className="more" onClick={handleMore}>
          More Reviews
        </Button>
      )
    }
  }

  const handleMore = () => {
    setPage(page + 1)
    tiles.push(next)
  }

  return (
    <section className="list">
      {/* sorter goes here */}
      <Container className="reviews">{tiles}</Container>
      <Container className="buttons">
        <Row>
          <Col>{more()}</Col>
          {/* <Col>
            <Button className="add">Add a Review</Button>
          </Col> */}
        </Row>
      </Container>
    </section>
  )
}

export default ReviewList
