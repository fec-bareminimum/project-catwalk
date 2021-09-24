import React, { useState, useEffect } from "react"
import SearchBar from "./SearchBar/SearchBar.jsx"
import QuestionsList from "./QuestionsList/QuestionsList.jsx"
import { Container } from "react-bootstrap"
import styled from "styled-components"
import QAProvider from "../../contexts/QAContext.jsx"

const Title = styled.h3`
  margin-top: 20px;
`

const QuestionsContainer = () => {
  const [filterBySearch, setFilterBySearch] = useState("")
  const [searchValue, setSearchValue] = useState("")

  return (
    <Container>
      <Title>QUESTIONS AND ANSWERS</Title>
      <SearchBar
        searchValue={searchValue}
        setFilterBySearch={setFilterBySearch}
        setSearchValue={setSearchValue}
      />
      <QuestionsList filterBySearch={filterBySearch} />
    </Container>
  )
}

export default QuestionsContainer
