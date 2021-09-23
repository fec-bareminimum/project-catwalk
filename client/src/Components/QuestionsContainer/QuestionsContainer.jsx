import React, { useState, useEffect } from "react"
import SearchBar from "./SearchBar/SearchBar.jsx"
import QuestionsList from "./QuestionsList/QuestionsList.jsx"
import { Container } from "react-bootstrap"
import styled from "styled-components"
import QAProvider from "../../contexts/QAContext.jsx"
import useQA from "../../contexts/QAContext.jsx"
import QuestionModal from "./QuestionsList/QuestionModal/QuestionModal.jsx"

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
  const [questionListData, setQuestionListData] = useState([])
  const [renderQuestionsListData, setRenderQuestionsListData] = useState([])
  const [hasQuestions, setHasQuestions] = useState(false)
  const [questionsCount, setQuestionsCount] = useState(4)
  const [hasMore, setHasMore] = useState(true)
  const { fetchQuestions } = useQA()

  useEffect(() => {
    // collecting entire Question List for a certain product ID
    getData()
  }, [])

  useEffect(() => {
    // sets the questions to be rendered; as questionsCount increases the more questions that are rendered
    getRenderData()
  }, [questionsCount])

  useEffect(() => {
    // filters the questions by the value being searched in the search bar
    filterData()
  }, [filterBySearch])

  const getData = () => {
    fetchQuestions(42370, 1, 50, (response) => {
      if (response.data.results.length > 0) {
        setHasQuestions(true)
      }
      setQuestionListData(response.data.results)
    })
  }

  const getRenderData = () => {
    setRenderQuestionsListData(questionListData.slice(0, questionsCount))
  }

  const filterData = () => {
    // filter the list or set the rendering questions list back to its previous state
    if (filterBySearch.length > 2) {
      setRenderQuestionsListData(
        questionListData.filter((question) =>
          question.question_body.includes(filterBySearch)
        )
      )
    } else {
      setRenderQuestionsListData(questionListData.slice(0, questionsCount))
    }
  }

  const fetchMoreQuestions = () => {
    // increases the question count as user scrolls down the infinite scroll list
    setQuestionsCount(questionsCount + 3)
    if (questionListData) {
      if (renderQuestionsListData.length === questionListData.length) {
        setHasMore(false)
      }
    }
  }

  const handleShowMoreQuestions = () => {
    // renders the max amount of questions after clicking "MORE ANSWERED QUESTIONS"
    if (questionListData) {
      if (renderQuestionsListData.length !== questionListData.length) {
        setQuestionsCount(questionListData.length)
        setHasMore(false)
      }
    }
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value)
    if (e.target.value.length > 2) {
      setFilterBySearch(e.target.value)
    } else {
      setFilterBySearch("")
    }
  }

  return (
    <Container>
      <Title>QUESTIONS AND ANSWERS</Title>
      <SearchBar searchValue={searchValue} handleSearchChange={handleSearchChange} />
      <QuestionsList
        fetchMoreQuestions={fetchMoreQuestions}
        handleShowMoreQuestions={handleShowMoreQuestions}
        renderQuestionsListData={renderQuestionsListData}
        questionsCount={questionsCount}
        hasMore={hasMore}
      />
      <Button1 onClick={handleShowMoreQuestions}>MORE ANSWERED QUESTIONS</Button1>
      <QuestionModal getData={getData} />
    </Container>
  )
}

export default QuestionsContainer
