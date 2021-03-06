import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Image, Modal } from "react-bootstrap"
import StarRatings from "react-star-ratings"
import useReviews from "../../../contexts/ReviewsContext.jsx"
import styled from "styled-components"

const Dash = styled.span`
  margin-right: 10px;
  margin-left: 10px;
`

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
            <Card.Text style={{ float: "right", color: "#28242B" }}>
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
    <Card.Text className="recommend" style={{ color: "#28242B" }}>
      &#10003; I recommend this product!
    </Card.Text>
  )

  const Response = () => (
    <Card className="response">
      <Card.Title>Response from seller</Card.Title>
      <Card.Text style={{ color: "#28242B" }}>{props.response}</Card.Text>
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
      <Dash />
      <Card.Link className="helpful" onClick={handleHelpful}>
        {`Yes (${props.helpfulness})`}
      </Card.Link>
      <Dash />
      {"|"}
      <Dash />
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
            <Card.Title style={{ color: "#28242B" }}>{props.summary}</Card.Title>
            <Card.Text style={{ color: "#28242B" }}>{props.body}</Card.Text>
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
