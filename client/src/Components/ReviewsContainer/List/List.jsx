import React, { useState, useEffect } from "react"
import ReviewList from "./ReviewList.jsx"
import MoreAddBtns from "./MoreAddBtns.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const List = () => {
  const { fetchReviews } = useReviews()
  const [sort, setSort] = useState("relevant")
  const [product_id, setProduct_id] = useState(42367)
  // const [display, setDisplay] = useState([])
  // const [next, setNext] = useState([])
  // const [all, setAll] = useState([])

  // fetch all sorted reviews & create first set of tiles
  // create undisplayed sets of tiles

  useEffect(() => {
    fetchReviews(1, 100, sort, product_id)
  }, [sort, product_id])

  // useEffect(() => {
  //   if (all.length > 0) {
  //     setNext(
  //       all.slice(page * count - 2, page * count).map((review) => (
  //         <Row key={review.review_id}>
  //           <Col>
  //             <ReviewTile {...review} />
  //           </Col>
  //         </Row>
  //       ))
  //     )
  //   }
  // }, [page])

  const sortReviews = (sort) => {
    setSort(sort)
  }

  const showMore = () => {
    setCount(count + 2)
  }

  return (
    <section className="list">
      <ReviewList sortReviews={sortReviews} />
      <MoreAddBtns showMore={showMore} />
    </section>
  )
}

export default List
