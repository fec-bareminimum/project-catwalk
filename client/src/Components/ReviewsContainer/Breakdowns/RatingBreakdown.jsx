import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingBreakdown = () => {
  const { reviewMetadata, fetchReviewMetadata } = useReviews()

  return (
    <section className="breakdown" style={bdStyle}>
      <Container className="rating"></Container>
      {/* <Container className="product">

      </Container> */}
    </section>
  )
}

export default RatingBreakdown
