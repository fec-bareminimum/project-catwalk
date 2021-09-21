import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import ProgressBar from "react-bootstrap/ProgressBar"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingBkdn = (props) => {
  const { reviews, reviewMetadata, filters } = useReviews()

  const Average = () => (
    <Row>
      <Col>
        <h1>{`${props.average}`}</h1>
      </Col>
      <Col>
        <StarRatings rating={props.average} starDimension="15px" starSpacing="0" />
      </Col>
    </Row>
  )

  const Bar = (props) => (
    <Row>
      <Col>
        <a
          onClick={() => props.filterReviews(props.rating)}
        >{`${props.rating} stars`}</a>
      </Col>
      <Col>
        <ProgressBar
          variant="success"
          max={reviews.length}
          now={reviewMetadata.ratings[props.rating]}
        ></ProgressBar>
      </Col>
      <Col>{reviewMetadata.ratings[props.rating] || 0}</Col>
    </Row>
  )

  const Filters = () => (
    <Row>
      <Col>
        <Alert variant="secondary">
          {"Filtered by: "}
          {filters.map((rating) => ` ${rating} `)}
          {"stars"}
          <Row>
            <Col>
              <Button onClick={() => props.filterReviews(0)}>
                Remove all filters
              </Button>
            </Col>
          </Row>
        </Alert>
      </Col>
    </Row>
  )

  const Recs = () => (
    <Row>
      <Col>
        {`${Math.round(
          (reviewMetadata.recommended.true / reviews.length) * 100
        )}% of reviews recommend this product `}
      </Col>
    </Row>
  )

  return (
    <Container className="ratingBkdn">
      {filters.length > 0 ? <Filters /> : null}
      {props.average > 0 ? <Average /> : null}
      {props.average > 0
        ? [5, 4, 3, 2, 1].map((rating, i) => (
            <Bar
              key={i}
              rating={Math.abs(i - 5)}
              filterReviews={props.filterReviews}
            />
          ))
        : null}
      {props.average > 0 ? <Recs /> : null}
    </Container>
  )
}

export default RatingBkdn
