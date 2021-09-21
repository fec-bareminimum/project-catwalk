import React, { useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProgressBar from "react-bootstrap/ProgressBar"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingBkdn = (props) => {
  const { reviewMetadata, count, average, setHelpers } = useReviews()

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

  const Bars = () =>
    [5, 4, 3, 2, 1].map((rating, i) => (
      <Row key={Math.abs(i - 5)}>
        <Col>
          <a
            onClick={(e) => {
              props.filterReviews(Math.abs(i - 5))
            }}
          >
            {`${Math.abs(i - 5)} stars`}
          </a>
        </Col>
        <Col>
          <ProgressBar
            variant="success"
            max={count}
            now={reviewMetadata.ratings[Math.abs(i - 5)]}
          ></ProgressBar>
        </Col>
        <Col>{reviewMetadata.ratings[Math.abs(i - 5)] || 0}</Col>
      </Row>
    ))

  return (
    <Container className="rating">
      {average > 0 ? <Average /> : null}
      <Container className="bars">{count > 0 ? <Bars /> : null}</Container>
    </Container>
  )
}

export default RatingBkdn
