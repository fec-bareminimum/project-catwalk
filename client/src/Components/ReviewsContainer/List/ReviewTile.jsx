import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import Modal from "react-bootstrap/Modal"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"

const ReviewTile = (props) => {
  const { markReviewHelpful, reportReview } = useReviews()
  const [helpful, setHelpful] = useState(false)
  const [report, setReport] = useState(false)

  const Header = () => (
    <Card.Header>
      <Container className="header">
        <Row>
          <Col className="stars">
            <StarRatings
              rating={props.rating}
              starDimension="15px"
              starSpacing="0"
            />
          </Col>
          <Col className="name-date">
            <Card.Text>
              {`${props.reviewer_name},
              ${new Date(props.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`}
            </Card.Text>
          </Col>
        </Row>
      </Container>
    </Card.Header>
  )

  const Recommend = () => (
    <Card.Text className="recommend">&#10003; I recommend this product!</Card.Text>
  )

  const Response = () => (
    <Card className="response">
      <Card.Title>Response from seller</Card.Title>
      <Card.Text>{props.response}</Card.Text>
    </Card>
  )

  const Photos = () => (
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
  )

  const Footer = () => (
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
  )

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
    <Row>
      <Col>
        <Card className="reviewTile">
          <Header />
          <Card.Body>
            <Card.Title>{props.summary}</Card.Title>
            <Card.Text>{props.body}</Card.Text>
            {props.recommend ? <Recommend /> : null}
            {props.response ? <Response /> : null}
            {props.photos.length > 0 ? <Photos /> : null}
          </Card.Body>
          <Footer />
        </Card>
      </Col>
    </Row>
  )
}

export default ReviewTile
