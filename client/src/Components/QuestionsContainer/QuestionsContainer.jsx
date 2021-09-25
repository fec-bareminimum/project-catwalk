import React, { useState, useEffect } from "react"
import QuestionsList from "./QuestionsList/QuestionsList.jsx"
import { Container } from "react-bootstrap"
import { QAProvider } from "../../contexts/QAContext.jsx"
import styled from "styled-components"

const Title = styled.h3`
  margin-top: 20px;
`

const QuestionsContainer = () => {
  return (
    <React.Fragment>
      <QAProvider>
        <Container>
          <Title>QUESTIONS AND ANSWERS</Title>
          <QuestionsList />
        </Container>
      </QAProvider>
    </React.Fragment>
  )
}

export default QuestionsContainer
