import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Breakdowns from "./Breakdowns/Breakdowns.jsx"
import List from "./List/List.jsx"
import useReviews from "../../contexts/ReviewsContext.jsx"
import useClickLogger from "../../hooks/useClickLogger.jsx"

const ReviewsContainer = () => {
  const { fetchReviews, fetchReviewMetadata, filters, setFilters } = useReviews()
  const [sort, setSort] = useState("relevant")
  const [product_id, setProduct_id] = useState(42366)

  useEffect(() => {
    fetchReviews(1, 100, sort, product_id, filters)
  }, [sort, product_id, filters])

  useEffect(() => {
    fetchReviewMetadata(product_id)
  }, [product_id])

  const sortReviews = (option) => {
    setSort(option)
  }

  const filterReviews = (option) => {
    if (filters.includes(option)) {
      setFilters(
        filters.reduce((toggled, current) => {
          if (current !== option) {
            toggled.push(current)
          }
          return toggled
        }, [])
      )
    } else if (option === 0) {
      setFilters([])
    } else {
      setFilters([...filters, option])
    }
  }

  return (
    <Container className="reviews">
      <h4>Ratings &#38; reviews</h4>
      <Row>
        <Col xs={2} md={4}>
          <Breakdowns filterReviews={filterReviews} />
        </Col>
        <Col xs={4} md={8}>
          <List sortReviews={sortReviews} />
        </Col>
      </Row>
    </Container>
  )
}

export default useClickLogger(ReviewsContainer, "Ratings & Reviews")
