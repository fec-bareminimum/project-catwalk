import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProgressBar from "react-bootstrap/ProgressBar"
import StarRatings from "react-star-ratings"
import ProductBreakdown from "./ProductBreakdown.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingBreakdown = () => {
  const { reviewMetadata, fetchReviewMetadata } = useReviews()
  const [product_id, setProduct_id] = useState(42367)
  const [ratings, setRatings] = useState({})
  const [recs, setRecs] = useState({})
  const [chars, setChars] = useState({})

  useEffect(() => {
    fetchReviewMetadata(product_id, (data) => {
      setRatings(data.ratings)
      setRecs(data.recommended)
      setChars(data.characteristics)
    })
  }, [product_id])

  const bigs = () => {
    var total = 0
    var count = 0
    var average = 0

    for (let rating in ratings) {
      total += rating * ratings[rating]
      count += 1 * ratings[rating]
    }
    if (total > 0) {
      average = Math.round((total / count) * 10) / 10
    }

    return (
      <Row className="bigs">
        <Col>
          <h1>{`${average}`}</h1>
        </Col>
        <Col>
          <StarRatings rating={average} starDimension="15px" starSpacing="0" />
        </Col>
      </Row>
    )
  }

  const bars = () => {
    var summary = [1, 2, 3, 4, 5]
    var count = 0

    for (let rating in ratings) {
      count += 1 * ratings[rating]
    }

    if (count > 0) {
      return summary.map((rating, i) => (
        <Row key={Math.abs(i - 5)}>
          <Col>{`${Math.abs(i - 5)} stars`}</Col>
          <Col>
            <ProgressBar max={count} now={ratings[Math.abs(i - 5)]}></ProgressBar>
          </Col>
          <Col>{ratings[Math.abs(i - 5)] || 0}</Col>
        </Row>
      ))
    }
  }

  return (
    <section className="breakdown">
      <Container className="rating">
        {bigs()}
        {bars()}
        {/* {percents} */}
      </Container>
      {/* <ProductBreakdown /> */}
    </section>
  )
}

export default RatingBreakdown
