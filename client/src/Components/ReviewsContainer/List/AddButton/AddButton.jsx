import React, { useState } from "react"
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import Overall from "./Overall.jsx"
import Characteristics from "./Characteristics.jsx"
import Review from "./Review.jsx"
import Upload from "./Upload.jsx"
import UserInfo from "./UserInfo.jsx"
import useReviews from "../../../../contexts/ReviewsContext.jsx"
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

const AddButton = (props) => {
  const { productInfo, addReview } = useReviews()
  // const [product_id, setProduct_id] = useState(productInfo.id)
  const [reviewData, setReviewData] = useState({ product_id: 42366 })
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)

  const submitData = (data) => {
    setReviewData(Object.assign(reviewData, data))
  }

  const AddForm = () => {
    const [validated, setValidated] = useState(false)

    const handleSubmit = (e) => {
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      setValidated(true)
      addReview(reviewData)
    }

    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Overall submitData={submitData} />
        <Characteristics submitData={submitData} />
        <Review submitData={submitData} />
        <Upload submitData={submitData} />
        <UserInfo submitData={submitData} />
        <Button type="submit">Submit</Button>
      </Form>
    )
  }

  const AddModal = () => {
    const handleClose = () => setShow(false)

    return (
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
          <AddForm />
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <Col>
      <Col>
        <Btn className="add" onClick={handleShow} style={{ float: "right" }}>
          ADD A REVIEW +
        </Btn>
        <AddModal />
      </Col>
    </Col>
  )
}

export default AddButton
