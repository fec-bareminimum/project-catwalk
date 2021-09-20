import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import RatingAvgs from "./RatingAvgs.jsx"
import RatingBars from "./RatingBars.jsx"
import ProductBreakdown from "./ProductBreakdown.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const RatingBreakdown = () => {
  const { reviewMetadata, fetchReviewMetadata } = useReviews()
  const [product_id, setProduct_id] = useState(42367)
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetchReviewMetadata(product_id, (data) => {
      for (let rating in reviewMetadata.ratings) {
        setCount(count + 1 * reviewMetadata.ratings[rating])
      }
    })
  }, [product_id])

  return (
    <section className="breakdown">
      <Container className="rating">
        <RatingAvgs />
        <RatingBars />
        {/* {percents} */}
      </Container>
      {/* <ProductBreakdown /> */}
    </section>
  )
}

export default RatingBreakdown
