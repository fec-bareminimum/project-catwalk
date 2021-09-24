import React, { useState, useEffect } from "react"
import RatingBkdn from "./RatingBkdn.jsx"
import ProductBkdn from "./ProductBkdn.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"
import useProducts from "../../../contexts/ProductsContext.jsx"

const Breakdowns = (props) => {
  const { reviews, reviewMetadata, getAverageRating } = useReviews()
  const { displayedProduct } = useProducts()
  const [avgRating, setAvgRating] = useState(0)
  const [reviewCt, setreviewCt] = useState(0)

  useEffect(() => {
    setAvgRating(getAverageRating(displayedProduct.id))
  }, [displayedProduct])

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
