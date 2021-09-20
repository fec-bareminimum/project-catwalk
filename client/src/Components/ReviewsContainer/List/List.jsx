import React, { useState, useEffect } from "react"
import ReviewList from "./ReviewList.jsx"
import MoreAddBtns from "./MoreAddBtns.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const List = () => {
  const { fetchReviews } = useReviews()
  const [sort, setSort] = useState("relevant")
  const [product_id, setProduct_id] = useState(42367)
  const [listLength, setListLength] = useState(2)

  // fetch all sorted reviews & create first set of tiles
  // create undisplayed sets of tiles

  useEffect(() => {
    fetchReviews(1, 100, sort, product_id)
  }, [sort, product_id])

  const sortReviews = (sort) => {
    setSort(sort)
  }

  const showMore = () => {
    setListLength(listLength + 2)
  }

  return (
    <section className="list">
      <ReviewList sortReviews={sortReviews} listLength={listLength} />
      <MoreAddBtns showMore={showMore} listLength={listLength} />
    </section>
  )
}

export default List
