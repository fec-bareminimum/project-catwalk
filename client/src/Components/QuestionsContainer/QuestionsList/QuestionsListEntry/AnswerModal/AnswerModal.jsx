import React, { useState, useEffect, useRef } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import useQA from "../../../../../contexts/QAContext.jsx"
import styled from "styled-components"
import Img from "react-cool-img"
import axios from "axios"

const Button1 = styled.button`
  margin-right: 15px;
  border-radius: 0px;
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
`
const Subtitle = styled.b`
  font-size: large;
`
const UnderText = styled.div`
  font-size: small;
`
const SmallUnderline = styled.a`
  font-size: small;
  margin-right: 10px;
  margin-left: 10px;
`

const AnswerModal = (props) => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [answerBody, setAnswerBody] = useState("")
  const [photoPreviews, setPhotoPreviews] = useState([])
  const [files, setFiles] = useState([])
  const [photos, setPhotos] = useState([])
  const [validated, setValidated] = useState(false)

  const context = useQA()

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    resetAnswerModal()
  }
  const handleEmail = (e) => setEmail(e.target.value)
  const handleNickname = (e) => setNickname(e.target.value)
  const handleAnswerBody = (e) => setAnswerBody(e.target.value)

  const resetAnswerModal = () => {
    setEmail("")
    setNickname("")
    setAnswerBody("")
    setPhotoPreviews([])
    setFiles([])
    setPhotos([])
    setValidated(false)
  }

  const handleSubmit = (event) => {
    setValidated(true)
    event.preventDefault()
    // post if all sections are valid
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      // console.log(form.checkValidity())
      context.postAnswer(
        props.questionId,
        answerBody,
        nickname,
        email,
        photos,
        (response) => {
          setShow(false)
          props.getAnswersData()
        }
      )
    }
  }

  const ImagePreviews = (props) => {
    if (props.url) {
      return <img src={props.url} width="100" height="100" />
    } else {
      return null
    }
  }

  const InputImages = () => {
    if (photoPreviews.length < 5) {
      return (
        <Form.Control
          type="file"
          onChange={(e) => {
            // console.log(e.target.files)
            setPhotoPreviews([
              ...photoPreviews,
              URL.createObjectURL(e.target.files[0]),
            ])
            setFiles([...files, e.target.files[0]])
          }}
        />
      )
    } else {
      return null
    }
  }

  const handleFileUpload = (e) => {
    e.preventDefault()
    const urls = []
    const uploaders = files.map((file) => {
      const formData = new FormData()
      formData.append("file", file)
      // formData.append("tags", `codeinfuse, medium, gist`)
      formData.append("upload_preset", "wcjmqzvr")
      // formData.append("api_key", "353977359896185")
      // formData.append("timestamp", (Date.now() / 1000) | 0)

      axios
        .post("https://api.cloudinary.com/v1_1/dqab317k6/image/upload", formData)
        .then((response) => {
          const data = response.data
          const fileURL = data.secure_url // You should store this URL for future references in your app
          // setPhotos([...photos, fileURL])
          urls.push(fileURL)
          console.log(data)
        })
    })
    setPhotos(urls)
  }

  return (
    <>
      <SmallUnderline onClick={handleShow}>Add Answer</SmallUnderline>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Submit your Answer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Subtitle>[Product Name]: {props.questionBody}</Subtitle>
            <Form.Group className="mb-3" controlId="AnswerForm.AnswerTextArea">
              <Form.Label>Your Answer:</Form.Label>
              <Form.Control
                required
                onChange={handleAnswerBody}
                as="textarea"
                type="text"
                max="1000"
                rows={3}
                value={answerBody}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="AnswerForm.Nickname">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
                required
                onChange={handleNickname}
                type="text"
                max="60"
                placeholder="Example: jack543!"
                value={nickname}
              />
              <UnderText>
                For privacy reasons, do not use your full name or email address
              </UnderText>
            </Form.Group>

            <Form.Group className="mb-3" controlId="AnswerForm.Email">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                required
                onChange={handleEmail}
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                placeholder="Example: jack@email.com"
                value={email}
              />
              <UnderText>
                For authentication reasons, you will not be emailed
              </UnderText>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <InputImages />
              <button onClick={handleFileUpload}>Upload</button>
            </Form.Group>
            {photoPreviews.map((photoPreview, i) => (
              <ImagePreviews url={photoPreview} key={i} />
            ))}
            <div>
              <Button1 onClick={handleClose}>Close</Button1>
              <Button1 type="submit">Submit</Button1>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AnswerModal
