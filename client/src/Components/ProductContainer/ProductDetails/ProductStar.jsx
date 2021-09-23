import React, { useState } from "react"
import StarRatings from "react-star-ratings"
import Stylesheet from "../styles.css"
import useReviews from "../../../contexts/ReviewsContext.jsx"

function Star() {
  const { reviewMetadata } = useReviews()

  let total = 0
  let count = 0
  let average = 0

  for (let rating in reviewMetadata.ratings) {
    total += rating * reviewMetadata.ratings[rating]
    count += 1 * reviewMetadata.ratings[rating]
  }
  if (total > 0) {
    average = Math.round((total / count) * 10) / 10
  }

  return (
    <StarRatings
      starSpacing={"2px"}
      rating={average}
      starRatedColor="rgb(0,0,0)"
      numberOfStars={5}
      starDimension="15px"
      className="star-rating"
    />
  )
}

export default Star
