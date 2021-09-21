import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import RatingBkdn from "./RatingBkdn.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const Breakdowns = (props) => {
  const { fetchReviewMetadata } = useReviews()
  const [product_id, setProduct_id] = useState(42366)

  useEffect(() => {
    fetchReviewMetadata(product_id)
  }, [product_id])

  return (
    <section className="breakdowns">
      <Container className="rating">
        <RatingBkdn filterReviews={props.filterReviews} />
        {/* {percent} */}
      </Container>
      {/* <ProductBreakdown parts /> */}
    </section>
  )
}

export default Breakdowns
