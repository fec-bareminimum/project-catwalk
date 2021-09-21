import React, { useState, useEffect } from "react"
import AnswersListEntry from "./AnswersListEntry/AnswersListEntry.jsx"
import useQA from "../../../../contexts/QAContext.jsx"
import { Row, Col } from "react-bootstrap"
import styled from "styled-components"

const QuestionLine = styled.div`
  display: flex;
`

const A = styled.b`
  font-size: large;
  margin-right: 10px;
`

const SmallBold = styled.b`
  font-size: small;
`

const LoadAnswersMargin = styled.div`
  margin-bottom: 10px;
  display: flex;
`

const AnswersList = (props) => {
  // will access state for answersList in QAContext
  // will have action button "LOAD MORE ANSWERS"
  // will use AnswersListEntry component to map over each answersList array
  const [answersListData, setAnswersListData] = useState([])
  const [renderedAnswersListData, setRenderedAnswersListData] = useState([])
  const [answersCount, setAnswersCount] = useState(2)
  const context = useQA()

  useEffect(() => {
    // loads in all the answers for the specific question
    context.fetchAnswers(props.questionId, 1, 12, (response) => {
      setAnswersListData(response.data.results)
    })
  }, [])

  useEffect(() => {
    // uses answersCount to conditionally render a specific amount of answers
    getRenderData()
  }, [answersCount, answersListData])

  const getRenderData = () => {
    setRenderedAnswersListData(answersListData.slice(0, answersCount))
  }

  const ShowMoreOrCollapse = () => {
    // When user clicks 'SEE MORE ANSWERS' changes the count to 12 and displays all the answers and when clicking 'COLLAPSE ANSWERS' reverts count to 2 and only shows 2 answers
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

  if (answersListData.length > 2 && renderedAnswersListData.length >= 2) {
    // conditionally renders whether there will be a 'SEE MORE ANSWERS' button or not
    return (
      <>
        <Row>
          <QuestionLine>
            <Col>
              <A>A:</A>
            </Col>

            <Col xs={8}>
              {renderedAnswersListData.map((answer) => (
                <AnswersListEntry answer={answer} key={answer.answer_id} />
              ))}
            </Col>

            <Col className="text-center" xs={4}></Col>
          </QuestionLine>
        </Row>

        <Row>
          <LoadAnswersMargin>
            <Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Col>

            <Col xs={8}>
              <ShowMoreOrCollapse />
            </Col>

            <Col className="text-center" xs={4}></Col>
          </LoadAnswersMargin>
        </Row>
      </>
    )
  }
  return (
    <>
      <Row>
        <QuestionLine>
          <Col>
            <A>A:</A>
          </Col>

          <Col xs={8}>
            {renderedAnswersListData.map((answer) => (
              <AnswersListEntry answer={answer} key={answer.answer_id} />
            ))}
          </Col>

          <Col className="text-center" xs={4}></Col>
        </QuestionLine>
      </Row>
    </>
  )
}

export default AnswersList
