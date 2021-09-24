import React, { useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import ReviewList from "./ReviewList.jsx"
import AddButton from "./AddButton/AddButton.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"
import styled from "styled-components"

const Btn = styled.button`
  margin-right: 15px;
  border-radius: 0px;
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
`

const List = (props) => {
  const { reviews } = useReviews()
  const [listLength, setListLength] = useState(2)

  const MoreBtn = () => (
    <Col>
      <Btn className="more" onClick={showMore} style={{ float: "left" }}>
        MORE REVIEWS
      </Btn>
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
