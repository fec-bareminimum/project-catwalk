import React, { useState, useEffect } from "react"
import RatingBkdn from "./RatingBkdn.jsx"
import ProductBkdn from "./ProductBkdn.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const Breakdowns = (props) => {
  const { reviews, reviewMetadata } = useReviews()
  const [average, setAverage] = useState(0)

  useEffect(() => {
    let total = 0
    let avg = 0

    for (let rating in reviewMetadata.ratings) {
      total += rating * reviewMetadata.ratings[rating]
      // ct += 1 * reviewMetadata.ratings[rating]
    }
    if (total > 0) {
      console.log(total)
      console.log(reviews.length)
      avg = Math.round((total / reviews.length) * 10) / 10
    }
    setAverage(avg)
  }, [reviewMetadata])

  return (
    <section className="breakdowns">
      <RatingBkdn filterReviews={props.filterReviews} average={average} />
      <ProductBkdn />
    </section>
  )
}

export default Breakdowns
