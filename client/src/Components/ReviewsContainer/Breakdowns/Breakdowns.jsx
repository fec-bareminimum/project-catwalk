import React, { useState, useEffect } from "react"
import RatingBkdn from "./RatingBkdn.jsx"
import ProductBkdn from "./ProductBkdn.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const Breakdowns = (props) => {
  const { reviews, reviewMetadata } = useReviews()
  const [avgRating, setAvgRating] = useState(0)
  const [reviewCt, setreviewCt] = useState(0)

  useEffect(() => {
    if (reviews.length > 0) {
      let [total, ct, avg] = [0, 0, 0]
      for (let rating in reviewMetadata.ratings) {
        total += rating * reviewMetadata.ratings[rating]
        ct += 1 * reviewMetadata.ratings[rating]
      }
      if (total > 0) {
        avg = Math.round((total / ct) * 10) / 10
      }
      setAvgRating(avg)
      setreviewCt(ct)
    }
  }, [reviewMetadata])

  return (
    <section id="reviews" className="breakdowns">
      {reviewCt > 0 ? (
        <RatingBkdn
          filterReviews={props.filterReviews}
          average={avgRating}
          count={reviewCt}
        />
      ) : null}
      {reviewMetadata.characteristics ? <ProductBkdn /> : null}
    </section>
  )
}

export default Breakdowns
