import React, { useState } from "react"
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import Overall from "./Overall.jsx"
import Characteristics from "./Characteristics.jsx"
import Review from "./Review.jsx"
import Upload from "./Upload.jsx"
import UserInfo from "./UserInfo.jsx"
// import useReviews from "../../../../contexts/ReviewsContext.jsx"

const AddButton = (props) => {
  // const { productInfo } = useReviews()
  // const [product_id, setProduct_id] = useState(productInfo.id)
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const AddModal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Container>
          <Row>
            <h3>Write Your Review</h3>
          </Row>
          <Row>
            {/* <h5>{`About the ${productInfo.name}`}</h5> */}
            <h5>About the Camo Onesie</h5>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Overall />
          <Characteristics />
          <Review />
          <Upload />
          <UserInfo />
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )

  return (
    <Col>
      <Col>
        <Button className="add" onClick={handleShow} style={{ float: "right" }}>
          Add a review
        </Button>
        <AddModal />
      </Col>
    </Col>
  )
}

export default AddButton
