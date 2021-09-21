import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const MoreAddBtns = (props) => {
  const { reviews } = useReviews()

  const MoreBtn = () => (
    <Button
      className="more"
      onClick={() => {
        props.showMore()
      }}
    >
      More Reviews
    </Button>
  )

  return (
    <Container className="buttons">
      <Row>
        <Col>
          {reviews && props.listLength < reviews.length ? <MoreBtn /> : null}
        </Col>
        {/* <Col>
            <Button className="add">Add a Review</Button>
          </Col> */}
      </Row>
    </Container>
  )
}

export default MoreAddBtns
