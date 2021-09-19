import React from "react"
import Card from "react-bootstrap/Card"
import StarRatings from "react-star-ratings"

const ReviewTile = (props) => {
  const helpful = "null"

  return (
    <Card style={{ width: "18rem" }} className="reviewTile">
      <Card.Header>
        <StarRatings rating={props.rating} starDimension="10px" starSpacing="0" />
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.summary}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
      </Card.Body>
      <Card.Footer>{helpful}</Card.Footer>
    </Card>
  )
}

export default ReviewTile
