import React, { useState, useEffect } from "react"
import SearchBar from "./SearchBar/SearchBar.jsx"
import QuestionsList from "./QuestionsList/QuestionsList.jsx"
import { Container } from "react-bootstrap"
import styled from "styled-components"
import QAProvider from "../../contexts/QAContext.jsx"

const Title = styled.div`
  margin-top: 20px;
`
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
