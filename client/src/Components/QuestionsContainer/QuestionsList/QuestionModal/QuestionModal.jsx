import React, { useState, useEffect } from "react"
import { Modal, Form } from "react-bootstrap"
import useQA from "../../../../contexts/QAContext.jsx"
import styled from "styled-components"

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

const QuestionModal = () => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [questionBody, setQuestionBody] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidNickname, setIsValidNickname] = useState(false)
  const [isValidQuestionBody, setIsValidQuestionBody] = useState(false)

  const context = useQA()

  useEffect(() => {
    // when changes occur to email, nickname or question body run validation function
    validateEmail(email)
    validateBlank()
  }, [email, nickname, questionBody])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleEmail = (e) => setEmail(e.target.value)
  const handleNickname = (e) => setNickname(e.target.value)
  const handleQuestionBody = (e) => setQuestionBody(e.target.value)

  const validateEmail = (mail) => {
    // used to validate whether email is valid or not
    // eslint-disable-next-line no-console
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true
    }
    return false
  }

  const validateBlank = () => {
    // used to validate all sections
    if (validateEmail(email)) {
      setIsValidEmail(true)
    }
    if (nickname !== "") {
      setIsValidNickname(true)
    }
    if (questionBody !== "") {
      setIsValidQuestionBody(true)
    }
  }

  const handleSubmit = () => {
    // if valid post the question, else send an alert regarding which sections are invalid
    if (isValidEmail && isValidNickname && isValidQuestionBody) {
      context.postQuestion(questionBody, nickname, email, 42366, (response) => {
        setShow(false)
      })
    } else {
      const invalidFields = []

      if (!isValidEmail) {
        invalidFields.push("Email")
      }
      if (!isValidNickname) {
        invalidFields.push(" Nickname")
      }
      if (!isValidQuestionBody) {
        invalidFields.push(" Question Body")
      }

      alert(
        "You must enter the following:\n" +
          invalidFields.map((invalidField) => invalidField)
      )
    }
  }

  return (
    // when Add a Question button is clicked, a question modal will appear with a question, nickname, and email address section
    <>
      <Button1 onClick={handleShow}>ADD A QUESTION +</Button1>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ask Your Question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Subtitle>About the [Product Name Here]</Subtitle>
          <Form.Group className="mb-3" controlId="QuestionForm.QuestionTextArea">
            <Form.Label>Question:</Form.Label>
            <Form.Control
              onChange={handleQuestionBody}
              as="textarea"
              type="text"
              max="1000"
              rows={3}
              value={questionBody}
            />
          </Form.Group>
          <Form>
            <Form.Group className="mb-3" controlId="QuestionForm.Nickname">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
                onChange={handleNickname}
                type="text"
                max="60"
                placeholder="Example: jackson11!"
                value={nickname}
              />
              <UnderText>
                For privacy reasons, do not use your full name or email address
              </UnderText>
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="QuestionForm.Email">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                onChange={handleEmail}
                type="email"
                placeholder="Why did you like the product or not?"
                value={email}
              />
              <UnderText>
                For authentication reasons, you will not be emailed
              </UnderText>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button1 onClick={handleClose}>Close</Button1>
          <Button1 onClick={handleSubmit}>Submit</Button1>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default QuestionModal
