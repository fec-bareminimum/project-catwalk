import React, { useState, useEffect } from "react"
import RatingBkdn from "./RatingBkdn.jsx"
import ProductBkdn from "./ProductBkdn.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const Breakdowns = (props) => {
  const { reviews, reviewMetadata } = useReviews()
  const [average, setAverage] = useState(0)

  useEffect(() => {
    if (reviews.length > 0) {
      let total = 0
      let avg = 0
      for (let rating in reviewMetadata.ratings) {
        total += rating * reviewMetadata.ratings[rating]
      }
      if (total > 0) {
        avg = Math.round((total / reviews.length) * 10) / 10
      }
      setAverage(avg)
    }
  }, [reviews, reviewMetadata])

  return (
    <section className="breakdowns">
      {average > 0 ? (
        <RatingBkdn filterReviews={props.filterReviews} average={average} />
      ) : null}
      {reviewMetadata.characteristics ? <ProductBkdn /> : null}
    </section>
  )
}

export default Breakdowns
