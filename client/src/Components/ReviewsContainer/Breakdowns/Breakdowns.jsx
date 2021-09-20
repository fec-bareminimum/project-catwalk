import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import RatingAvgs from "./RatingAvgs.jsx"
import RatingBars from "./RatingBars.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const Breakdowns = () => {
  const { fetchReviewMetadata } = useReviews()
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
      {/* <ProductBreakdown parts /> */}
    </section>
  )
}

export default Breakdowns
