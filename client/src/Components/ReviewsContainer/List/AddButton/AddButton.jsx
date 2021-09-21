import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Overall from "./Overall.jsx"
import Characteristics from "./Characteristics.jsx"
import Review from "./Review.jsx"
import Upload from "./Upload.jsx"
import UserInfo from "./UserInfo.jsx"
import useReviews from "../../../../contexts/ReviewsContext.jsx"

const AddButton = (props) => {
  const { reviews, reviewMetadata, details, productInfo } = useReviews()
  // const [product_id, setProduct_id] = useState(productInfo.id)
  const [validated, setValidated] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleSubmit = () => console.log("submit")

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
        <Form onSubmit={handleSubmit}>
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
      {/* {productInfo && reviewMetadata && details ? (*/}
      {reviews && reviewMetadata && details ? (
        <Col>
          <Button className="add" onClick={handleShow} style={{ float: "right" }}>
            Add a review
          </Button>
          <AddModal />
        </Col>
      ) : null}
    </Col>
  )
}

export default AddButton
