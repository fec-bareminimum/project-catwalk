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

  const AddBtn = () => {
    const [show, setShow] = useState(false)
    const [stars, setStars] = useState(0)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    return (
      <Col>
        <Button className="add" onClick={handleShow} style={{ float: "right" }}>
          Add a review
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form>
              <h3>Write Your Review</h3>
              {/* <h5>{`About the ${productInfo.name}`}</h5> */}
              <h5>About the Camo Onesie</h5>
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
              </Col>
            </Form>
          </Modal.Body>
        </Modal>
      </Col>
    )
  }

  return <Col>{reviews ? <AddBtn /> : null}</Col>
}

export default AddBtn
