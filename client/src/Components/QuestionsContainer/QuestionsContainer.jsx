import React, { useState, useEffect } from "react"
import QuestionsList from "./QuestionsList/QuestionsList.jsx"
import { Container } from "react-bootstrap"
import styled from "styled-components"
import useProducts from "../../contexts/ProductsContext.jsx"

const Title = styled.h3`
  margin-top: 20px;
`

const QuestionsContainer = () => {
  const { displayedProduct } = useProducts()

  return (
    <Container>
      <Title>QUESTIONS AND ANSWERS</Title>
      <QuestionsList displayedProduct={displayedProduct} />
    </Container>
  )
}

export default QuestionsContainer
