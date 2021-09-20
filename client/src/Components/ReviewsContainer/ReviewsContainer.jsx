import React from "react"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import List from "./List/List.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

const ReviewsContainer = () => {
  return (
    <div className="reviewsContainer">
      <List />
    </div>
  )
}

export default useClickLogger(ReviewsContainer, "Ratings & Reviews")
