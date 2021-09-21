import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const MoreAddBtns = (props) => {
  const { reviews } = useReviews()

  const MoreBtn = () => (
    <Col>
      <Button
        className="more"
        onClick={() => {
          props.showMore()
        }}
        style={{ float: "left" }}
      >
        More reviews
      </Button>
    </Col>
  )

  const AddBtn = () => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    return (
      <Col>
        <Button className="add" onClick={handleShow} style={{ float: "right" }}>
          Add a review
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body></Modal.Body>
        </Modal>
      </Col>
    )
  }

  return (
    <Container className="buttons">
      <Row>
        {reviews && props.listLength < reviews.length ? <MoreBtn /> : null}
        <AddBtn />
      </Row>
    </Container>
  )
}

export default MoreAddBtns
