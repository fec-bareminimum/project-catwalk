import React, { useState } from "react"
import SearchBar from "./SearchBar/SearchBar.jsx"
import QuestionsList from "./QuestionsList/QuestionsList.jsx"
import { Container } from "react-bootstrap"
import styled from "styled-components"
import { QAProvider } from "../../contexts/QAContext.jsx"

const Title = styled.div`
  margin-top: 20px;
`

const QuestionsContainer = () => {
  const [filterBySearch, setFilterBySearch] = useState("")
  const [searchValue, setSearchValue] = useState("")

  return (
    <QAProvider>
      <Container>
        <Title>QUESTIONS AND ANSWERS</Title>
        <SearchBar
          searchValue={searchValue}
          filterBySearch={filterBySearch}
          setFilterBySearch={setFilterBySearch}
          setSearchValue={setSearchValue}
        />
        <QuestionsList
          filterBySearch={filterBySearch}
          setFilterBySearch={setFilterBySearch}
        />
      </Container>
    </QAProvider>
  )
}

export default QuestionsContainer
