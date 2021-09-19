import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import StarRatings from "react-star-ratings"
import ProductBreakdown from "./ProductBreakdown.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const bkdStyle = {
  width: "33vh",
  height: "75vh",
}

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
    console.log(total, count, average)

    return (
      <Row>
        <Col>
          <h1>{`${average}`}</h1>
        </Col>
        <Col>
          <StarRatings rating={average} starDimension="15px" starSpacing="0" />
        </Col>
      </Row>
    )
  }

  return (
    <section className="breakdown" style={bkdStyle}>
      <Container className="rating">
        {bigs()}
        {/* {bars} */}
        {/* {percents} */}
      </Container>
      {/* <ProductBreakdown /> */}
    </section>
  )
}

export default RatingBreakdown
