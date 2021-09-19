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
    const overall = 3.5
    return (
      <Row>
        <Col>
          <h1>{overall}</h1>
        </Col>
        <Col>
          <StarRatings rating={overall} starDimension="15px" starSpacing="0" />
        </Col>
      </Row>
    )
  }

  return (
    <section className="breakdown" style={bkdStyle}>
      <Container className="rating">
        {bigs()}
        {/* {bars} */}
        {/* {percentage} */}
      </Container>
      {/* <ProductBreakdown /> */}
    </section>
  )
}

export default RatingBreakdown
