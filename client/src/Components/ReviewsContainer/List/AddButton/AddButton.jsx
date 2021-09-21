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
  const { reviews, reviewMetadata, details, productInfo, addReview } = useReviews()
  const [show, setShow] = useState(false)

  // const [product_id, setProduct_id] = useState(productInfo.)
  const [rating, setRating] = useState(0)
  const [summary, setSummary] = useState("")
  const [body, setBody] = useState("")
  const [recommend, setRecommend] = useState("false")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photos, setPhotos] = useState([])
  const [characteristics, setCharacteristics] = useState({})

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Col>
      {/* {productInfo && reviewMetadata && details ? (*/}
      {reviews && reviewMetadata && details ? (
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
                <Characteristics />
                <Review />
                <Upload />
                <UserInfo />
                {/* <Submit /> */}
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      ) : null}
    </Col>
  )
}

export default AddButton
