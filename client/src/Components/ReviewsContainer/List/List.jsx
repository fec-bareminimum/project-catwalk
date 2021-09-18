import React, { useState, useLayoutEffect, useEffect } from "react"
// import Sorter from "./Sorter.jsx"
import ReviewList from "./ReviewList.jsx"
// import Buttons from "./Buttons.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const List = () => {
  const { reviews, fetchReviews } = useReviews()
  const [page, setPage] = useState(1) // based on list length/scroll
  const [count, setCount] = useState(2) // based on list length/scroll
  const [sort, setSort] = useState("relevant") // based on sort
  const [product_id, setProduct_id] = useState(42367)

  fetchReviews(page, count, sort, product_id, (response) => {
    console.log("fetched reviews: ", response)
  })

  useEffect(() => {
    fetchReviews(page, count, sort, product_id, (response) => {
      console.log("fetched reviews: ", response)
    })
  }, [page, count, sort, product_id])

  return (
    <section className="list">
      {/* <Sorter /> */}
      <ReviewList data={reviews.results} />
      {/* <Buttons /> */}
    </section>
  )
}

export default List
