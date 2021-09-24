import React, { useState, useEffect } from "react"
import { Modal, Form } from "react-bootstrap"
import useQA from "../../../../contexts/QAContext.jsx"
import useProducts from "../../../../contexts/ProductsContext.jsx"
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

const QuestionModal = (props) => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [questionBody, setQuestionBody] = useState("")
  const [validated, setValidated] = useState(false)
  const [product_id, setProduct_id] = useState(null)
  const [product_name, setProduct_name] = useState("")

  const { postQuestion } = useQA()
  const { displayedProduct } = useProducts()

  useEffect(() => {
    if (Object.keys(displayedProduct).length > 0) {
      setProduct_id(displayedProduct.id)
      setProduct_name(displayedProduct.name)
    }
  }, [displayedProduct])

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    resetQuestionModal()
  }
  const handleEmail = (e) => setEmail(e.target.value)
  const handleNickname = (e) => setNickname(e.target.value)
  const handleQuestionBody = (e) => setQuestionBody(e.target.value)

  const resetQuestionModal = () => {
    setEmail("")
    setNickname("")
    setQuestionBody("")
    setValidated(false)
  }

  const handleSubmit = (event) => {
    // if valid post the question, else send an alert regarding which sections are invalid
    setValidated(true)
    event.preventDefault()
    // post if all sections are valid
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      postQuestion(questionBody, nickname, email, product_id, (response) => {
        setShow(false)
        props.getData()
      })
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
          <Subtitle>{`About the ${product_name}`}</Subtitle>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="QuestionForm.QuestionTextArea">
              <Form.Label>Question:</Form.Label>
              <Form.Control
                required
                onChange={handleQuestionBody}
                as="textarea"
                type="text"
                max="1000"
                rows={3}
                value={questionBody}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="QuestionForm.Nickname">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
                required
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

            <Form.Group className="mb-3" controlId="QuestionForm.Email">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                required
                onChange={handleEmail}
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                placeholder="Example: jackson22@email.com"
                value={email}
              />
              <UnderText>
                For authentication reasons, you will not be emailed
              </UnderText>
            </Form.Group>
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

export default QuestionModal
