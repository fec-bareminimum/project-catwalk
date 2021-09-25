import React, { useState, useEffect } from "react"
import { ListGroup, Button } from "react-bootstrap"
import QuestionListEntry from "./QuestionsListEntry/QuestionsListEntry.jsx"
import SearchBar from "../SearchBar/SearchBar.jsx"
import QuestionModal from "./QuestionModal/QuestionModal.jsx"
import useQA from "../../../contexts/QAContext.jsx"
import useProducts from "../../../contexts/ProductsContext.jsx"
import styled from "styled-components"
import InfiniteScroll from "react-infinite-scroll-component"

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
  const [filterBySearch, setFilterBySearch] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [questionsHeight, setQuestionsHeight] = useState(1)
  const [product_id, setProduct_id] = useState(null)

  // const context = useQA()
  const context = useQA()
  const { displayedProduct } = useProducts()

  useEffect(() => {
    if (Object.keys(displayedProduct).length > 0) {
      setProduct_id(displayedProduct.id)
    }
  }, [displayedProduct])

  useEffect(() => {
    if (product_id) {
      getData()
      setQuestionsCount(4)
      setHasMore(true)
    }
  }, [product_id])

  useEffect(() => {
    // sets the questions to be rendered; as questionsCount increases the more questions that are rendered
    if (questionListData[0]) {
      getRenderData()
      setQuestionsHeight(250)
    }
  }, [questionsCount, questionListData])

  useEffect(() => {
    // filters the questions by the value being searched in the search bar
    if (renderQuestionsListData.length > 0) {
      filterData()
    }
  }, [filterBySearch])

  const getData = () => {
    context.fetchQuestions(product_id, 1, 50, (response) => {
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

  const MoreAnswersButton = () => {
    if (questionsHeight > 1) {
      return (
        <Button1 onClick={handleShowMoreQuestions}>MORE ANSWERED QUESTIONS</Button1>
      )
    } else {
      return null
    }
  }

  return (
    <React.Fragment>
      <SearchBar
        searchValue={searchValue}
        setFilterBySearch={setFilterBySearch}
        setSearchValue={setSearchValue}
        questionsHeight={questionsHeight}
      />
      <div>
        <InfiniteScroll
          dataLength={questionsCount}
          next={fetchMoreQuestions}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={questionsHeight}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>There are no more questions!</b>
            </p>
          }
        >
          {renderQuestionsListData.map((question) => (
            <QuestionListEntry question={question} key={question.question_id} />
          ))}
        </InfiniteScroll>
        <MoreAnswersButton />
        <QuestionModal productId={product_id} getData={getData} />
      </div>
    </React.Fragment>
  )
}

export default QuestionsList
