import React, { useState, useEffect } from "react"
import { Modal, Form } from "react-bootstrap"
import useQA from "../../../../../contexts/QAContext.jsx"
import styled from "styled-components"
import Img from "react-cool-img"

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
const SmallUnderline = styled.u`
  font-size: small;
  margin-right: 10px;
  margin-left: 10px;
`

const AnswerModal = (props) => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [answerBody, setAnswerBody] = useState("")
  const [photos, setPhotos] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidNickname, setIsValidNickname] = useState(false)
  const [isValidAnswerBody, setIsValidAnswerBody] = useState(false)

  const context = useQA()

  useEffect(() => {
    validateEmail(email)
    validateBlank()
  }, [email, nickname, answerBody])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleEmail = (e) => setEmail(e.target.value)
  const handleNickname = (e) => setNickname(e.target.value)
  const handleAnswerBody = (e) => setAnswerBody(e.target.value)

  const handleFile = (e) => {
    // sets photos to image link
    const content = e.target.result
    setPhotos(content)
    // You can set content in state and show it in render.
  }
  const handleChangeFile = (file) => {
    // used for image upload
    let fileData = new FileReader()
    fileData.onloadend = handleFile
    fileData.readAsDataURL(file)
  }

  const validateEmail = (mail) => {
    // eslint-disable-next-line no-console
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      // eslint-disable-line no-eval
      return true
    }
    return false
  }

  const validateBlank = () => {
    if (validateEmail(email)) {
      setIsValidEmail(true)
    }
    if (nickname !== "") {
      setIsValidNickname(true)
    }
    if (answerBody !== "") {
      setIsValidAnswerBody(true)
    }
  }

  const handleSubmit = () => {
    // post if all sections are valid
    if (isValidEmail && isValidNickname && isValidAnswerBody) {
      context.postAnswer(
        props.questionId,
        answerBody,
        nickname,
        email,
        [photos],
        (response) => {
          setShow(false)
        }
      )
    } else {
      const invalidFields = []

      if (!isValidEmail) {
        invalidFields.push("Email")
      }
      if (!isValidNickname) {
        invalidFields.push(" Nickname")
      }
      if (!isValidAnswerBody) {
        invalidFields.push(" Answer Body")
      }

      alert(
        "You must enter the following:\n" +
          invalidFields.map((invalidField) => invalidField)
      )
    }
  }

  return (
    <>
      <SmallUnderline onClick={handleShow}>Add Answer</SmallUnderline>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Submit your Answer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Subtitle>[Product Name]: {props.questionBody}</Subtitle>
          <Form.Group className="mb-3" controlId="AnswerForm.AnswerTextArea">
            <Form.Label>Your Answer:</Form.Label>
            <Form.Control
              onChange={handleAnswerBody}
              as="textarea"
              type="text"
              max="1000"
              rows={3}
              value={answerBody}
            />
          </Form.Group>
          <Form>
            <Form.Group className="mb-3" controlId="AnswerForm.Nickname">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
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
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="AnswerForm.Email">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                onChange={handleEmail}
                type="email"
                placeholder="Example: jack@email.com"
                value={email}
              />
              <UnderText>
                For authentication reasons, you will not be emailed
              </UnderText>
            </Form.Group>
          </Form>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Images:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handleChangeFile(e.target.files[0])}
            />
          </Form.Group>

          <Img src={photos} width="100" height="100" />
        </Modal.Body>

        <Modal.Footer>
          <Button1 onClick={handleClose}>Close</Button1>
          <Button1 onClick={handleSubmit}>Submit</Button1>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AnswerModal
