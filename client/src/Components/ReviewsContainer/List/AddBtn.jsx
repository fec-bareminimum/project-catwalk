import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Image from "react-bootstrap/Image"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const AddBtn = (props) => {
  const { reviews, reviewMetadata, details, productInfo } = useReviews()
  const [show, setShow] = useState(false)
  const [stars, setStars] = useState(0)
  const [starDetails, setStarDetails] = useState({
    5: "Great",
    4: "Good",
    3: "Average",
    2: "Fair",
    1: "Poor",
  })
  const [picked, setPicked] = useState({})
  const [body, setBody] = useState("")
  const [imgs, setImgs] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const Overall = () => (
    <Form.Group>
      <Form.Label>Overall rating*</Form.Label>
      <div style={{ float: "right" }}>
        <StarRatings
          rating={stars}
          changeRating={(rating) => setStars(rating)}
          starDimension="15px"
          starSpacing="0"
        />
        {stars > 0 ? <Form.Text>{starDetails[stars]}</Form.Text> : null}
      </div>
    </Form.Group>
  )

  const Recommend = () => (
    <Form.Group>
      <Form.Label>Do you recommend this product?*</Form.Label>
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

  const Rate = () =>
    Object.keys(reviewMetadata.characteristics).map((char, i) => (
      <Form.Group key={i}>
        <Form.Label>{`${char}*`}</Form.Label>
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
              <Form.Text>{details[char][0]}</Form.Text>
            </Col>
            <Col>
              <Form.Text>{details[char][4]}</Form.Text>
            </Col>
          </Row>
        </Container>
      </Form.Group>
    ))

  const Review = () => (
    <Form.Group>
      <Form.Label>Review summary</Form.Label>
      <Form.Control
        type="text"
        placeholder="Example: Best purchase ever!"
        maxLength="60"
      />
      <Form.Label>Review body*</Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Why did you like the product or not?"
        maxLength="1000"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Form.Text>
        {body.length < 50
          ? `Minimum required characters left: ${50 - body.length}`
          : "Minimum reached"}
      </Form.Text>
    </Form.Group>
  )

  const Upload = () => (
    <Form.Group>
      <Form.Label>Upload your photos</Form.Label>
      {imgs.length < 5 ? (
        <Form.Control
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            setImgs([...imgs, e.target.files])
          }}
        />
      ) : null}
      {imgs.length > 0
        ? imgs.map((img, i) => (
            <Image key={i} src={URL.createObjectURL(new Blob(img))} thumbnail />
          ))
        : null}
      {imgs.length === 0 ? imgs.map((img, i) => URL.revokeObjectURL(img)) : null}
    </Form.Group>
  )

  const Nickname = () => (
    <Form.Group>
      <Form.Label>What is your nickname?*</Form.Label>
      <Form.Control type="text" placeholder="Example: jackson11!" maxLength="60" />
      <Form.Text>
        For privacy reasons, do not use your full name or email address
      </Form.Text>
    </Form.Group>
  )

  const Email = () => (
    <Form.Group>
      <Form.Label>Your email*</Form.Label>
      <Form.Control
        type="email"
        placeholder="Example: jackson11@email.com"
        maxLength="60"
      />
      <Form.Text>For authentication reasons, you will not be emailed</Form.Text>
    </Form.Group>
  )

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
                <Rate />
                {Review()}
                <Upload />
                <Nickname />
                <Email />
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      ) : null}
    </Col>
  )
}

export default AddBtn
