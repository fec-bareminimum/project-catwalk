import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingAvgs = () => {
  const { reviewMetadata, fetchReviewMetadata } = useReviews()
  var total = 0
  var count = 0
  var average = 0

  for (let rating in reviewMetadata.ratings) {
    total += rating * reviewMetadata.ratings[rating]
    count += 1 * reviewMetadata.ratings[rating]
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

export default RatingAvgs
