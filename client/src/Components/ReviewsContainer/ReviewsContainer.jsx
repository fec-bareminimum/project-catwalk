import React from "react"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import RatingBreakdown from "./Breakdowns/RatingBreakdown.jsx"
import ReviewList from "./List/ReviewList.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

const ReviewsContainer = () => {
  return (
    <div className="reviewsContainer">
      <RatingBreakdown />
      <ReviewList />
    </div>
  )
}

export default useClickLogger(ReviewsContainer, "Ratings & Reviews")
