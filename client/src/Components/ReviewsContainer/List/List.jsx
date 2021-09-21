import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ReviewList from "./ReviewList.jsx"
import AddBtn from "./AddBtn.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const List = (props) => {
  const { reviews } = useReviews()
  const [listLength, setListLength] = useState(2)

  const MoreBtn = () => (
    <Col>
      <Button className="more" onClick={showMore} style={{ float: "left" }}>
        More reviews
      </Button>
    </Col>
  )

  const showMore = () => {
    setListLength(listLength + 2)
  }

  return (
    <section className="list">
      <ReviewList sortReviews={props.sortReviews} listLength={listLength} />
      <Container>
        <Row>
          {reviews && listLength < reviews.length ? <MoreBtn /> : null}
          <AddBtn />
        </Row>
      </Container>
    </section>
  )
}

export default List
