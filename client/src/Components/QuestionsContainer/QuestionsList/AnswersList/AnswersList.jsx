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

  if (
    props.answersListData.length > 2 &&
    props.renderedAnswersListData.length >= 2
  ) {
    // conditionally renders whether there will be a 'SEE MORE ANSWERS' button or not
    return (
      <>
        <Row>
          <QuestionLine>
            <Col>
              <A>A:</A>
            </Col>

            <Col xs={8}>
              {props.renderedAnswersListData.map((answer) => (
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
              <props.ShowMoreOrCollapse />
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
            {props.renderedAnswersListData.map((answer) => (
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
