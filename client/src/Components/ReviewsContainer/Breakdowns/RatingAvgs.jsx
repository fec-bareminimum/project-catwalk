import React, { useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingAvgs = (props) => {
  const { reviewMetadata, average, setHelpers } = useReviews()

  useEffect(() => setHelpers())

  const Average = () => (
    <Row>
      <Col>
        <h1>{`${average}`}</h1>
      </Col>
      <Col>
        <StarRatings rating={average} starDimension="15px" starSpacing="0" />
      </Col>
    </Row>
  )

  return (
    <Container className="average">{average > 0 ? <Average /> : null}</Container>
  )
}

export default RatingAvgs
