import React from "react"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import ReviewList from "./List/ReviewList.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

const ReviewsContainer = () => {
  return (
    <div className="reviewsContainer">
      <ReviewList />
    </div>
  )
}

export default useClickLogger(ReviewsContainer, "Ratings & Reviews")
