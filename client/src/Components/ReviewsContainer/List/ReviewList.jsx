import React, { useState, useEffect } from "react"
import CardGroup from "react-bootstrap/CardGroup"
import ReviewTile from "./ReviewTile.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ReviewList = (props) => {
  const { reviews, fetchReviews } = useReviews()
  const [page, setPage] = useState(1) // based on list length/scroll
  const [count, setCount] = useState(2) // based on list length/scroll
  const [sort, setSort] = useState("relevant") // based on sort
  const [product_id, setProduct_id] = useState(42367)

  const [tiles, setTiles] = useState([]) // temp fix? reviews broken

  useEffect(() => {
    fetchReviews(page, count, sort, product_id, (data) => {
      setTiles(
        data.results.map((review) => (
          <ReviewTile key={review.review_id} {...review} />
        ))
      )
    })
  }, [page, count, sort, product_id])

  return <CardGroup className="reviewList">{tiles}</CardGroup>
}

export default ReviewList
