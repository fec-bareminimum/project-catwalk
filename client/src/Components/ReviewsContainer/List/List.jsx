import React, { useState } from "react"
import ReviewList from "./ReviewList.jsx"
import MoreAddBtns from "./MoreAddBtns.jsx"

const List = (props) => {
  const [listLength, setListLength] = useState(2)

  const showMore = () => {
    setListLength(listLength + 2)
  }

  return (
    <section className="list">
      <ReviewList sortReviews={props.sortReviews} listLength={listLength} />
      <MoreAddBtns showMore={showMore} listLength={listLength} />
    </section>
  )
}

export default List
