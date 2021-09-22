import React, { useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import ReviewList from "./ReviewList.jsx"
import AddButton from "./AddButton/AddButton.jsx"
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
          {listLength < reviews.length ? <MoreBtn /> : null}
          <AddButton />
        </Row>
      </Container>
    </section>
  )
}

export default List
