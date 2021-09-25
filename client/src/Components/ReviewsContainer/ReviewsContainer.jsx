import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Breakdowns from "./Breakdowns/Breakdowns.jsx"
import List from "./List/List.jsx"
import useReviews from "../../contexts/ReviewsContext.jsx"
import useProducts from "../../contexts/ProductsContext.jsx"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import styled from "styled-components"

const Title = styled.h3`
  margin-top: 20px;
`

const ReviewsContainer = () => {
  const { fetchReviews, fetchReviewMetadata, filters, setFilters } = useReviews()
  const { displayedProduct } = useProducts()
  const [sort, setSort] = useState("relevant")
  const [product_id, setProduct_id] = useState(null)
  const [product_name, setProduct_name] = useState("")

  useEffect(() => {
    if (Object.keys(displayedProduct).length > 0) {
      setProduct_id(displayedProduct.id)
      setProduct_name(displayedProduct.name)
    }
  }, [displayedProduct])

  useEffect(() => {
    if (product_id) {
      fetchReviews(1, 100, sort, product_id, filters, (data) => null)
    }
  }, [sort, product_id, filters])

  useEffect(() => {
    if (product_id) {
      fetchReviewMetadata(product_id)
    }
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
    <Container className="reviews" id="ratings-reviews">
      <Title>RATINGS &#38; REVIEWS</Title>
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
