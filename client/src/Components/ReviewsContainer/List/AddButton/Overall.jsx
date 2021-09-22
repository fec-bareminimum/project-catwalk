import React, { useState, useEffect, useRef } from "react"
import { Form, Overlay, Tooltip } from "react-bootstrap"
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

  const Recommend = () => (
    <Form.Group>
      <Form.Label>Do you recommend this product?*</Form.Label>
      {["No", "Yes"].map((option, i) => {
        const [show, setShow] = useState(false)
        const target = useRef(null)
        return (
          <div key={i}>
            <Form.Check
              required
              inline
              type="radio"
              name="rec"
              label={option}
              ref={target}
              onChange={() => {
                i === 0 ? setRecommend(false) : setRecommend(true)
                if (rating === 0) {
                  setShow(!show)
                }
              }}
              style={{ float: "right" }}
            />
            <Overlay target={target.current} show={show} placement="top">
              {(props) => <Tooltip {...props}>Please select a rating first</Tooltip>}
            </Overlay>
          </div>
        )
      })}
    </Form.Group>
  )

  return (
    <>
      <Form.Group>
        <Form.Label>Overall rating*</Form.Label>
        <div style={{ float: "right" }}>
          <StarRatings
            rating={rating}
            changeRating={(stars) => setRating(stars)}
            starDimension="15px"
            starSpacing="0"
          />
          {rating > 0 ? <Form.Text>{starDetails[rating]}</Form.Text> : null}
        </div>
      </Form.Group>
      <Recommend />
    </>
  )
}

export default Overall
