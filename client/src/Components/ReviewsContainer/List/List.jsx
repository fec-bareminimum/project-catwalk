import React, { useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import ReviewList from "./ReviewList.jsx"
import AddButton from "./AddButton/AddButton.jsx"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const List = (props) => {
  const { reviews } = useReviews()
  const [listLength, setListLength] = useState(2)

  // const [product_id, setProduct_id] = useState(productInfo.)
  // const [rating, setRating] = useState(0)
  // const [summary, setSummary] = useState("")
  // const [body, setBody] = useState("")
  // const [recommend, setRecommend] = useState("false")
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [photos, setPhotos] = useState([])
  // const [characteristics, setCharacteristics] = useState({})

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
