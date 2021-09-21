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
  const { reviews, reviewMetadata, details, productInfo } = useReviews()
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
      <Form.Group>
        <Form.Label>Overall rating*</Form.Label>
        <div style={{ float: "right" }}>
          <StarRatings
            rating={stars}
            changeRating={(rating) => setStars(rating)}
            starDimension="15px"
            starSpacing="0"
          />
          {stars > 0 ? <Form.Text>{details[stars]}</Form.Text> : null}
        </div>
      </Form.Group>
    )
  }

  const Recommend = () => {
    return (
      <Form.Group>
        <Form.Label>Do you recommend this product?</Form.Label>
        {["No", "Yes"].map((option, i) => (
          <Form.Check
            inline
            key={option}
            type="radio"
            name="rec"
            label={option}
            style={{ float: "right" }}
          />
        ))}
      </Form.Group>
    )
  }

  const Characteristics = () => {
    const [picked, setPicked] = useState({})
    return Object.keys(reviewMetadata.characteristics).map((char, i) => (
      <Form.Group key={i}>
        <Form.Label>{char}</Form.Label>
        <Container>
          <Row>
            <Col>
              {Object.keys(picked).length > 0 && picked[char] ? (
                <Form.Text>{details[char][picked[char] - 1]}</Form.Text>
              ) : (
                <Form.Text>None selected</Form.Text>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {[1, 2, 3, 4, 5].map((rating, i) => (
                <Form.Check
                  inline
                  key={`${char}-${rating}`}
                  type="radio"
                  name={char}
                  label={rating}
                  onChange={() => setPicked({ ...picked, [char]: rating })}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <div>{details[char][0]}</div>
            </Col>
            <Col>
              <div>{details[char][4]}</div>
            </Col>
          </Row>
        </Container>
      </Form.Group>
    ))
  }

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
                <Recommend />
                <Characteristics />
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      ) : null}
    </Col>
  )
}

export default AddBtn
