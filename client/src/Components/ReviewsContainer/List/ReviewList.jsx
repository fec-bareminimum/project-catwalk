import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ReviewTile from "./ReviewTile.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const listStyle = {
  width: "66vh",
}
const tilesStyle = {
  height: "75vh",
  overflow: "auto",
}

const ReviewList = (props) => {
  const { reviews, fetchReviews } = useReviews()
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(100)
  const [sort, setSort] = useState("relevant")
  const [product_id, setProduct_id] = useState(42367)
  const [display, setDisplay] = useState([])
  const [next, setNext] = useState([])
  const [all, setAll] = useState([])

  // fetch all sorted reviews & create first set of tiles
  useEffect(() => {
    fetchReviews(page, count, sort, product_id, (data) => {
      setDisplay(
        data.results.slice(0, 2).map((review) => (
          <Row key={review.review_id}>
            <Col>
              <ReviewTile {...review} />
            </Col>
          </Row>
        ))
      )
      setAll(data.results)
      setCount(2)
      setPage(page + 1)
    })
  }, [sort, product_id])

  // create undisplayed sets of tiles
  useEffect(() => {
    if (all.length > 0) {
      setNext(
        all.slice(page * count - 2, page * count).map((review) => (
          <Row key={review.review_id}>
            <Col>
              <ReviewTile {...review} />
            </Col>
          </Row>
        ))
      )
    }
  }, [page])

  const more = () => {
    if (next.length > 0) {
      return (
        <Button
          className="more"
          onClick={() => {
            setPage(page + 1)
            display.push(next)
          }}
        >
          More Reviews
        </Button>
      )
    }
  }

  return (
    <section className="list" style={listStyle}>
      {/* <Container className="sorter">{sorter()}</Container> */}
      <Container className="tiles" style={tilesStyle}>
        {display}
      </Container>
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
