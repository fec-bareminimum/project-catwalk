import React, { useState, useEffect } from "react"
import RatingBkdn from "./RatingBkdn.jsx"
import ProductBkdn from "./ProductBkdn.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const Breakdowns = (props) => {
  const { reviews, reviewMetadata, getAverageRating } = useReviews()
  const [avgRating, setAvgRating] = useState(0)
  const [reviewCt, setreviewCt] = useState(0)

  useEffect(() => {
    setAvgRating(getAverageRating(42366))
  }, [reviewMetadata])

  return (
    <section className="breakdowns">
      {avgRating > 0 ? (
        <RatingBkdn filterReviews={props.filterReviews} average={avgRating} />
      ) : null}
      {reviewMetadata.characteristics ? <ProductBkdn /> : null}
    </section>
  )
}

export default Breakdowns
