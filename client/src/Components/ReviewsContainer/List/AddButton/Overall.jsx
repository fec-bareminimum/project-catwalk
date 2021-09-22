import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import StarRatings from "react-star-ratings"

const Overall = (props) => {
  const [rating, setRating] = useState(0)
  const [recommend, setRecommend] = useState(false)
  const [starDetails, setStarDetails] = useState({
    5: "Great",
    4: "Good",
    3: "Average",
    2: "Fair",
    1: "Poor",
  })

  useEffect(() => {
    props.submitData({ rating: rating })
    props.submitData({ recommend: recommend })
  }, [rating, recommend])

  return (
    <div>
      <Form.Group>
        <Form.Label>Overall rating*</Form.Label>
        <div style={{ float: "right" }}>
          <StarRatings
            // required
            rating={rating}
            changeRating={(stars) => setRating(stars)}
            starDimension="15px"
            starSpacing="0"
          />
          {rating > 0 ? <Form.Text>{starDetails[rating]}</Form.Text> : null}
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>Do you recommend this product?*</Form.Label>
        {["No", "Yes"].map((option, i) => (
          <Form.Check
            required
            inline
            key={option}
            type="radio"
            name="rec"
            label={option}
            onChange={() => setRecommend(true)}
            style={{ float: "right" }}
          />
        ))}
      </Form.Group>
    </div>
  )
}

export default Overall
