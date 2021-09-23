import React, { useState, useEffect } from "react"
import { ListGroup, Button } from "react-bootstrap"
import QuestionListEntry from "./QuestionsListEntry/QuestionsListEntry.jsx"
import QuestionModal from "./QuestionModal/QuestionModal.jsx"
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

  return (
    <div>
      <InfiniteScroll
        dataLength={props.questionsCount}
        next={props.fetchMoreQuestions()}
        hasMore={props.hasMore}
        loader={<h4>Loading...</h4>}
        height={300}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>There are no more questions!</b>
          </p>
        }
      >
        {props.renderQuestionsListData.map((question) => (
          <QuestionListEntry question={question} key={question.question_id} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default QuestionsList
