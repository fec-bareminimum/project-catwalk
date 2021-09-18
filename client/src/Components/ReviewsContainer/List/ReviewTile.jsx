import React from "react"
import Card from "react-bootstrap/Card"

const ReviewTile = (props) => {
  const stars = "null"
  const helpful = "null"

  return (
    <Card style={{ width: "18rem" }} className="reviewTile">
      <Card.Header>{stars}</Card.Header>
      <Card.Body>
        <Card.Title>{props.summary}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
      </Card.Body>
      <Card.Footer>{helpful}</Card.Footer>
    </Card>
  )
}

export default ReviewTile
