import React from "react"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import ReviewList from "./ReviewList/ReviewList.jsx"

const ReviewsContainer = () => {
  return (
    <div className="reviewsContainer">
      <ReviewList />
    </div>
  )
}

export default useClickLogger(ReviewsContainer, "Ratings & Reviews")
