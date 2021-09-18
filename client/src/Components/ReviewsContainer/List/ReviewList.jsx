import React from "react"
import CardGroup from "react-bootstrap/CardGroup"
import ReviewTile from "./ReviewTile.jsx"

const ReviewList = (props) => {
  return (
    <CardGroup className="reviewList">
      {props.data.map((review) => (
        <ReviewTile key={review.id} {...review} />
      ))}
    </CardGroup>
  )
}

export default ReviewList
