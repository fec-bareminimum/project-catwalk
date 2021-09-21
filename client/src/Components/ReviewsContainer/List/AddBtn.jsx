import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const AddBtn = (props) => {
  const { reviews, productInfo } = useReviews()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const Overall = () => {
    const [stars, setStars] = useState(0)
    const [details, setDetails] = useState({
      5: "Great",
      4: "Good",
      3: "Average",
      2: "Fair",
      1: "Poor",
    })

    return (
      <Container>
        <Col>
          <Form.Label>Overall rating*</Form.Label>
        </Col>
        <Col>
          <StarRatings
            rating={stars}
            changeRating={(rating) => setStars(rating)}
            starDimension="15px"
            starSpacing="0"
          />
          {stars > 0 ? <Form.Text>{details[stars]}</Form.Text> : null}
        </Col>
      </Container>
    )
  }

  return (
    <Col>
      {/* {productInfo ? (*/}
      {reviews ? (
        <Col>
          <Button className="add" onClick={handleShow} style={{ float: "right" }}>
            Add a review
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <h3>Write Your Review</h3>
              {/* <h5>{`About the ${productInfo.name}`}</h5> */}
              <h5>About the Camo Onesie</h5>
              <Form>
                <Overall />
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      ) : null}
    </Col>
  )
}

export default AddBtn
