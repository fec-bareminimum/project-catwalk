import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Breakdowns from "./Breakdowns/Breakdowns.jsx"
import List from "./List/List.jsx"
import useReviews from "../../contexts/ReviewsContext.jsx"
import useClickLogger from "../../hooks/useClickLogger.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

const ReviewsContainer = () => {
  const { fetchReviews } = useReviews()
  const [sort, setSort] = useState("relevant")
  const [product_id, setProduct_id] = useState(42366)
  const [filters, setFilters] = useState([])

  useEffect(() => {
    fetchReviews(1, 100, sort, product_id, filters)
  }, [sort, product_id, filters])

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
