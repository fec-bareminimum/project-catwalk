import React, { useState, useEffect } from "react"
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

  // console.log("reviews before", reviews)

  useEffect(() => {
    console.log("inside effect")
    fetchReviews(page, count, sort, product_id, (data) => {
      // console.log("reviews after", data)
    })
  }, [page, count, sort, product_id])
  return (
    <section className="list">
      {/* <Sorter /> */}
      <ReviewList data={reviews} />
      {/* <Buttons /> */}
    </section>
  )
}

export default List
