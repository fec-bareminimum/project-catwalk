import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import RatingAvgs from "./RatingAvgs.jsx"
import RatingBars from "./RatingBars.jsx"
import ProductBreakdown from "./ProductBreakdown.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingBreakdown = () => {
  const { reviewMetadata, fetchReviewMetadata } = useReviews()
  const [product_id, setProduct_id] = useState(42367)

  useEffect(() => {
    fetchReviewMetadata(product_id)
  }, [product_id])

  return (
    <section className="breakdowns">
      <Container className="rating">
        <RatingAvgs />
        <RatingBars />
        {/* {percent} */}
      </Container>
      {/* <ProductBreakdown /> */}
    </section>
  )
}

export default RatingBreakdown
