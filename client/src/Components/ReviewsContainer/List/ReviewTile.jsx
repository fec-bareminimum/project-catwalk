import React from "react"
import Card from "react-bootstrap/Card"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ReviewTile = (props) => {
  const { markReviewHelpful, reportReview } = useReviews()

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
        <Card.Link onClick={() => markReviewHelpful(props.review_id)}>
          Yes ({props.helpfulness})
        </Card.Link>
        |<Card.Link onClick={() => reportReview(props.review_id)}>Report</Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default ReviewTile
