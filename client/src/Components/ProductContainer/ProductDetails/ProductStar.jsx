import React, { useState } from "react"
import StarRatings from "react-star-ratings"
import Stylesheet from "../styles.css"
import useReviews from "../../../contexts/ReviewsContext.jsx"

function Star(props) {
  const { getAverageRating } = useReviews()

  return (
    <StarRatings
      starSpacing={"2px"}
      rating={getAverageRating(props.id)}
      starRatedColor="rgb(0,0,0)"
      numberOfStars={5}
      starDimension="15px"
      className="star-rating"
    />
  )
}

export default Star
