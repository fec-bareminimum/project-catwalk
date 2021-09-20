import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProgressBar from "react-bootstrap/ProgressBar"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingBars = () => {
  const { reviewMetadata } = useReviews()

  let count = 0
  for (let rating in reviewMetadata.ratings) {
    count += 1 * reviewMetadata.ratings[rating]
  }

  if (count > 0) {
    return [5, 4, 3, 2, 1].map((rating, i) => (
      <Row key={Math.abs(i - 5)}>
        <Col>
          <a>{`${Math.abs(i - 5)} stars`}</a>
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
  } else {
    return null
  }
}

export default RatingBars
