import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Modal from "react-bootstrap/Modal"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ReviewTile = (props) => {
  const { markReviewHelpful, reportReview } = useReviews()
  const [helpful, setHelpful] = useState(false)
  const [report, setReport] = useState(false)

  const header = () => (
    <Container>
      <Row>
        <Col className="stars">
          <StarRatings rating={props.rating} starDimension="15px" starSpacing="0" />
        </Col>
        <Col className="name-date">
          <Card.Text>
            {props.reviewer_name}
            {", "}
            {new Date(props.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Card.Text>
        </Col>
      </Row>
    </Container>
  )

  const recommend = () => {
    if (props.recommend) {
      return (
        <Card.Text className="recommend">
          &#10003; I recommend this product!
        </Card.Text>
      )
    }
  }

  const response = () => {
    if (props.response) {
      return (
        <Card className="response">
          <Card.Title>Response</Card.Title>
          <Card.Text>{props.response}</Card.Text>
        </Card>
      )
    }
  }

  const photos = () => {
    if (props.photos.length > 0) {
      return (
        <Container>
          <Row>
            {props.photos.map((photo) => {
              const [show, setShow] = useState(false)
              const handleClose = () => setShow(false)
              const handleShow = () => setShow(true)
              return (
                <Col key={photo.id} xs={6} md={4}>
                  <Image src={photo.url} onClick={handleShow} thumbnail />
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <Image src={photo.url} onClick={handleShow} fluid />
                    </Modal.Body>
                  </Modal>
                </Col>
              )
            })}
          </Row>
        </Container>
      )
    }
  }

  const handleHelpful = () => {
    if (!helpful) {
      markReviewHelpful(props.review_id)
      setHelpful(!helpful)
    }
  }

  const handleReport = () => {
    if (!report) {
      reportReview(props.review_id)
      setReport(!report)
    }
  }

  return (
    <Card className="reviewTile">
      <Card.Header>{header()}</Card.Header>
      <Card.Body>
        <Card.Title>{props.summary}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
        {recommend()}
        {response()}
        {photos()}
      </Card.Body>
      <Card.Footer>
        {"Helpful? "}
        <Card.Link className="helpful" onClick={handleHelpful}>
          {`Yes (${props.helpfulness})`}
        </Card.Link>
        {" |"}
        <Card.Link className="report" onClick={handleReport}>
          {"Report"}
        </Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default ReviewTile
