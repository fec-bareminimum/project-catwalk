import React, { useState, useEffect } from "react"
import { ListGroup, Button } from "react-bootstrap"
// import QuestionListEntry from "./QuestionsListEntry/QuestionsListEntry.jsx"
// import QuestionModal from "./QuestionModal/QuestionModal.jsx"
import useQA from "../../../contexts/QAContext.jsx"
import styled from "styled-components"
// import InfiniteScroll from "react-infinite-scroll-component"

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

const QuestionsList = (props) => {
  // accepts list of questions: load up to four questions
  // in return statement will map over list of questions in component QuestionsListEntry
  // FOR NOW will contain the "more answered Questions" and "Add a Question" button underneath
  const [questionListData, setQuestionListData] = useState([])
  const [renderQuestionsListData, setRenderQuestionsListData] = useState([])
  const [questionsCount, setQuestionsCount] = useState(4)
  const [hasMore, setHasMore] = useState(true)

  const context = useQA()

  useEffect(() => {
    // collecting entire Question List for a certain product ID
    getData()
  }, [])

  useEffect(() => {
    // sets the questions to be rendered; as questionsCount increases the more questions that are rendered
    getRenderData()
  }, [questionsCount, questionListData])

  useEffect(() => {
    // filters the questions by the value being searched in the search bar
    filterData()
  }, [props.filterBySearch])

  const getData = () => {
    context.fetchQuestions(42370, 1, 50, (response) => {
      setQuestionListData(response.data.results)
    })
  }

  const getRenderData = () => {
    setRenderQuestionsListData(questionListData.slice(0, questionsCount))
  }

  const filterData = () => {
    // filter the list or set the rendering questions list back to its previous state
    if (props.filterBySearch.length > 2) {
      setRenderQuestionsListData(
        questionListData.filter((question) =>
          question.question_body.includes(props.filterBySearch)
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

  const searchFilter = () => {
    if (props.searchValue > 2) {
      props.setFilterBySearch(props.searchValue)
    }
  }

  return (
    <div>
      {/* <InfiniteScroll
        dataLength={questionsCount}
        next={fetchMoreQuestions}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={300}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>There are no more questions!</b>
          </p>
        }
      >
      </InfiniteScroll> */}
      <Button1 onClick={handleShowMoreQuestions}>MORE ANSWERED QUESTIONS</Button1>
      {/* <QuestionModal getData={getData} /> */}
    </div>
  )
}

export default QuestionsList
