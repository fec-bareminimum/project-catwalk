import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ReviewTile = (props) => {
  const { markReviewHelpful, reportReview } = useReviews()
  const [helpful, setHelpful] = useState(false)
  const [report, setReport] = useState(false)

  const stars = (
    <StarRatings
      className="stars"
      rating={props.rating}
      starDimension="15px"
      starSpacing="0"
    />
  )

  const date = new Date(props.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const verified = () => {
    // if email is associated with a sale...
    if (props.email) {
      return <Badge>Verified Purchaser</Badge>
    }
  }

  const recommend = () => {
    if (props.recommend) {
      return (
        <Card.Text className="recommend">
          &#10003; I recommend this product!
        </Card.Text>
      )
    }
  }

  const response = () => {
    if (props.response) {
      return (
        <Card>
          <Card.Title>Response</Card.Title>
          <Card.Text>{props.response}</Card.Text>
        </Card>
      )
    }
  }

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
    <Card className="reviewTile">
      <Card.Header>
        {stars}
        {verified()} {props.reviewer_name}, {date}
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.summary}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
        {recommend()}
        {response()}
      </Card.Body>
      <Card.Footer>
        Helpful?{" "}
        <Card.Link className="helpful" onClick={handleHelpful}>
          Yes ({props.helpfulness})
        </Card.Link>
        {" | "}
        <Card.Link className="report" onClick={handleReport}>
          Report
        </Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default ReviewTile
