import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ReviewTile = (props) => {
  const { markReviewHelpful, reportReview } = useReviews()
  const [helpful, setHelpful] = useState(false)
  const [report, setReport] = useState(false)

  const handleHelpful = () => {
    if (!helpful) {
      markReviewHelpful(props.review_id)
      setHelpful(!helpful)
    }
  }

  const handleReport = () => {
    if (!report) {
      reportReview(props.review_id)
      setReport(!report)
    }
  }

  return (
    <Card style={{ width: "18rem" }} className="reviewTile">
      <Card.Header>
        <StarRatings rating={props.rating} starDimension="15px" starSpacing="0" />
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.summary}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        Helpful?
        <Card.Link onClick={handleHelpful}>Yes ({props.helpfulness})</Card.Link>|
        <Card.Link onClick={handleReport}>Report</Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default ReviewTile
