import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingAvgs = () => {
  const { reviewMetadata } = useReviews()

  let total = 0
  let count = 0
  let average = 0

  for (let rating in reviewMetadata.ratings) {
    total += rating * reviewMetadata.ratings[rating]
    count += 1 * reviewMetadata.ratings[rating]
  }
  if (total > 0) {
    average = Math.round((total / count) * 10) / 10
  }

  return (
    <Row className="averages">
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
