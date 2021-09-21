import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProgressBar from "react-bootstrap/ProgressBar"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingBkdn = (props) => {
  const { reviewMetadata, count, average, setHelpers } = useReviews()
  // const [filtered, setFiltered] = useState(false)

  useEffect(() => setHelpers())

  // const Filters = () => (

  // )

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
          max={count}
          now={reviewMetadata.ratings[props.rating]}
        ></ProgressBar>
      </Col>
      <Col>{reviewMetadata.ratings[props.rating] || 0}</Col>
    </Row>
  )

  return (
    <Container className="rating">
      {/* {filtered ? <Filters /> : null} */}
      {average > 0 ? <Average /> : null}
      <Container className="bars">
        {count > 0
          ? [5, 4, 3, 2, 1].map((rating, i) => (
              <Bar
                key={i}
                rating={Math.abs(i - 5)}
                filterReviews={props.filterReviews}
              />
            ))
          : null}
      </Container>
    </Container>
  )
}

export default RatingBkdn
