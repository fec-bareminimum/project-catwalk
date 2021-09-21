import React, { useState, useEffect } from "react"
import useQA from "../../../../../contexts/QAContext.jsx"
import styled from "styled-components"

const Dash = styled.span`
  margin-right: 10px;
  margin-left: 10px;
`

const Helpful = styled.span`
  margin-right: 10px;
`

const SmallDiv = styled.div`
  font-size: small;
  margin-bottom: 10px;
`

const AnswersListEntry = (props) => {
  const [answerHelpfulness, setAnswerHelpfulness] = useState(
    props.answer.helpfulness
  )
  const [helpfulnessClicked, setHelpfulnessClicked] = useState(false)
  const [reportedAnswerClicked, setReportedAnswerClicked] = useState(
    props.answer.reported
  )
  const context = useQA()

  function handleHelpfulChange(e) {
    // sends a request to change the value of the helpful key to add 1 to the current helpfulness and only allow the click to happen once per visit
    context.markAnswerHelpful(props.answer.answer_id, (response) => {
      console.log("Sucessfully Update Answer's Helpfulness")
      setAnswerHelpfulness(answerHelpfulness + 1)
      setHelpfulnessClicked(true)
    })
  }

  function handleReport() {
    // sends a request to change the value of the report key to true and only allow the click to happen once per visit
    context.reportAnswer(props.answer.answer_id, (response) => {
      console.log("Sucessfully Reported Answer")
      setReportedAnswerClicked(true)
    })
  }

  function Report() {
    // function is used to report answer and change report to reported
    if (!reportedAnswerClicked) {
      return <u onClick={handleReport}>Report</u>
    } else {
      return <u>Reported</u>
    }
  }

  function BoldedText({ text, shouldBeBold }) {
    // function is used to bold 'Seller' if user is the seller
    const textArray = text.split(shouldBeBold)
    return (
      <span>
        {textArray.map((item, index) => (
          <>
            {item}
            {index !== textArray.length - 1 && <b key={index}>{shouldBeBold}</b>}
          </>
        ))}
      </span>
    )
  }

  if (props.answer.photos.length > 0) {
    // conditionally render the answers with or without photos
    return (
      <div>
        {props.answer.body}
        <div>
          {props.answer.photos.map((photo) => (
            <img key={photo.id} src={photo.url} alt="" width="200" height="200" />
          ))}
        </div>
        <SmallDiv>
          by <BoldedText text={props.answer.answerer_name} shouldBeBold={"Seller"} />
          , {props.answer.date.substr(1, 10)}
          <Dash>|</Dash>
          <Helpful>Helpful?</Helpful>
          <u onClick={handleHelpfulChange}>Yes({answerHelpfulness})</u>
          <Dash>|</Dash>
          <Report />
        </SmallDiv>
      </div>
    )
  }
  return (
    <div>
      {props.answer.body}
      <SmallDiv>
        by <BoldedText text={props.answer.answerer_name} shouldBeBold={"Seller"} />,
        {props.answer.date}
        <Dash>|</Dash>
        <Helpful>Helpful?</Helpful>
        <u onClick={handleHelpfulChange}>Yes({answerHelpfulness})</u>
        <Dash>|</Dash>
        <Report />
      </SmallDiv>
    </div>
  )
}

export default AnswersListEntry
