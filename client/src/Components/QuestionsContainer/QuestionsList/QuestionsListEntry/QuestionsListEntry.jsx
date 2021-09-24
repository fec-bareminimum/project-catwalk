import React, { useState, useEffect } from "react"
import AnswersList from "../AnswersList/AnswersList.jsx"
import { Row, Col } from "react-bootstrap"
import styled from "styled-components"
import useQA from "../../../../contexts/QAContext.jsx"
import AnswerModal from "./AnswerModal/AnswerModal.jsx"

const QuestionLine = styled.div`
  display: flex;
`
const Q = styled.b`
  font-size: large;
  margin-right: 10px;
`
const Question = styled.b`
  font-size: large;
`
const SmallSpan = styled.span`
  font-size: small;
  margin-right: 10px;
  margin-left: 10px;
`
const SmallUnderline = styled.a`
  font-size: small;
  margin-right: 10px;
  margin-left: 10px;
`
const SmallBold = styled.b`
  font-size: small;
`

const QuestionsListEntry = (props) => {
  // uses component AnswersList to list answers for each question
  // will contain action ('helpfulness' & 'Add Answer') buttons
  // Display up to two answers for each question
  const [questionHelpfulness, setQuestionHelpfulness] = useState(
    props.question.question_helpfulness
  )
  const [helpfulnessClicked, setHelpfulnessClicked] = useState(false)
  const [answersListData, setAnswersListData] = useState([])
  const [renderedAnswersListData, setRenderedAnswersListData] = useState([])
  const [answersCount, setAnswersCount] = useState(2)
  const context = useQA()

  useEffect(() => {
    getAnswersData()
  }, [])

  useEffect(() => {
    getAnswersRenderData()
  }, [answersCount, answersListData])

  function handleHelpfulChange(e) {
    // handles changing the helpfulness each time the page is visited and 'helpful' button is clicked
    if (!helpfulnessClicked) {
      context.markQuestionHelpful(props.question.question_id, (response) => {
        setQuestionHelpfulness(questionHelpfulness + 1)
        setHelpfulnessClicked(true)
      })
    }
  }

  const getAnswersData = () => {
    context.fetchAnswers(props.question.question_id, 1, 12, (response) => {
      setAnswersListData(response.data.results)
    })
  }

  const getAnswersRenderData = () => {
    setRenderedAnswersListData(answersListData.slice(0, answersCount))
  }

  const ShowMoreOrCollapse = () => {
    if (answersCount === 2) {
      return (
        <SmallBold onClick={() => setAnswersCount(12)}>SEE MORE ANSWERS</SmallBold>
      )
    } else if (answersCount !== 2) {
      return (
        <SmallBold onClick={() => setAnswersCount(2)}>COLLAPSE ANSWERS</SmallBold>
      )
    }
  }

  return (
    <div>
      <Row>
        <QuestionLine>
          <Col>
            <Q>Q:</Q>
          </Col>

          <Col xs={8}>
            <Question>{props.question.question_body}</Question>
          </Col>

          <Col xs={4} className="text-center">
            <SmallSpan>Helpful?</SmallSpan>
            <SmallUnderline onClick={handleHelpfulChange}>
              Yes({questionHelpfulness})
            </SmallUnderline>
            <SmallSpan>|</SmallSpan>
            <AnswerModal
              questionId={props.question.question_id}
              questionBody={props.question.question_body}
              getAnswersData={getAnswersData}
            />
          </Col>
        </QuestionLine>
      </Row>

      <AnswersList
        answersListData={answersListData}
        renderedAnswersListData={renderedAnswersListData}
        ShowMoreOrCollapse={ShowMoreOrCollapse}
      />
    </div>
  )
}

export default QuestionsListEntry
