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
  const { reviews, reviewMetadata, details, productInfo, addReview } = useReviews()
  const [show, setShow] = useState(false)
  const [starDetails, setStarDetails] = useState({
    5: "Great",
    4: "Good",
    3: "Average",
    2: "Fair",
    1: "Poor",
  })
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

  const Overall = () => (
    <Form.Group>
      <Form.Label>Overall rating*</Form.Label>
      <div style={{ float: "right" }}>
        <StarRatings
          rating={rating}
          changeRating={(stars) => setStars(stars)}
          starDimension="15px"
          starSpacing="0"
        />
        {rating > 0 ? <Form.Text>{starDetails[rating]}</Form.Text> : null}
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

  const Rate = () => {
    const [chars, setChars] = useState({})
    return Object.keys(reviewMetadata.characteristics).map((char, i) => (
      <Form.Group key={i}>
        <Form.Label>{`${char}*`}</Form.Label>
        <Container>
          <Row>
            <Col>
              {chars[reviewMetadata.characteristics[char].id] ? (
                <Form.Text>
                  {details[char][chars[reviewMetadata.characteristics[char].id] - 1]}
                </Form.Text>
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
                  onChange={() =>
                    setChars({
                      ...chars,
                      [reviewMetadata.characteristics[char].id]: rating,
                    })
                  }
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
  }

  const Review = () => (
    <Form.Group>
      <Form.Label>Review summary</Form.Label>
      <Form.Control
        type="text"
        placeholder="Example: Best purchase ever!"
        maxLength="60"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
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
      {photos.length < 5 ? (
        <Form.Control
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            setPhotos([...photos, e.target.files])
          }}
        />
      ) : null}
      {photos.length > 0
        ? photos.map((photo, i) => (
            <Image key={i} src={URL.createObjectURL(new Blob(photo))} thumbnail />
          ))
        : null}
      {photos.length === 0
        ? photos.map((photo, i) => URL.revokeObjectURL(photo))
        : null}
    </Form.Group>
  )

  const Nickname = () => (
    <Form.Group>
      <Form.Label>What is your nickname?*</Form.Label>
      <Form.Control
        type="text"
        placeholder="Example: jackson11!"
        maxLength="60"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Text>For authentication reasons, you will not be emailed</Form.Text>
    </Form.Group>
  )

  const Submit = () => (
    <Button
      type="submit"
      onSubmit={() =>
        addReview(
          product_id,
          rating,
          summary,
          body,
          recommend,
          name,
          email,
          photos,
          characteristics,
          callback
        )
      }
    ></Button>
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
                <Submit />
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      ) : null}
    </Col>
  )
}

export default AddBtn
