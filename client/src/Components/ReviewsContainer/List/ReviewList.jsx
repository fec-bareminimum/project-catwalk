import React, { useState, useEffect } from "react"
import CardGroup from "react-bootstrap/CardGroup"
import ReviewTile from "./ReviewTile.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ReviewList = () => {
  const { reviews, fetchReviews } = useReviews()
  const page = 1 // based on list length/scroll
  const count = 2 // based on list length/scroll
  const sort = "relevant" // "newest", "helpful" based on sort
  const product_id = 42367

  useEffect(
    (page, count, sort) => {
      fetchReviews(page, count, sort, product_id, (data) => {
        console.log(data)
      })
    },
    [product_id]
  )

  return (
    <CardGroup className="reviewList">
      {reviews.map((review) => (
        <ReviewTile key={review.id} {...review} />
      ))}
    </CardGroup>
  )
}

export default ReviewList
