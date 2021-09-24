import React, { useState, useEffect } from "react"
import useQA from "../../../../../contexts/QAContext.jsx"
import styled from "styled-components"
import Img from "react-cool-img"

const Dash = styled.span`
  margin-right: 10px;
  margin-left: 10px;
`

const Helpful = styled.span`
  margin-right: 10px;
`

// const SmallDiv = styled.div`
//   font-size: small;
//   margin-bottom: 10px;
// `

// const smallA = styled.a`
//   font-size: small;
// `

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
    if (!helpfulnessClicked) {
      context.markAnswerHelpful(props.answer.answer_id, (response) => {
        setAnswerHelpfulness(answerHelpfulness + 1)
        setHelpfulnessClicked(true)
      })
    }
  }

  function handleReport() {
    // sends a request to change the value of the report key to true and only allow the click to happen once per visit
    if (!reportedAnswerClicked) {
      context.reportAnswer(props.answer.answer_id, (response) => {
        setReportedAnswerClicked(true)
      })
    }
  }

  function Report() {
    // function is used to report answer and change report to reported
    if (!reportedAnswerClicked) {
      return <a onClick={handleReport}>Report</a>
    } else {
      return <a>Reported</a>
    }
  }

  function BoldedText({ text, shouldBeBold }) {
    // function is used to bold 'Seller' if user is the seller
    const textArray = text.split(shouldBeBold)
    return (
      <span>
        {textArray.map((item, index) => (
          <React.Fragment key={index}>
            {item}
            {index !== textArray.length - 1 && <b>{shouldBeBold}</b>}
          </React.Fragment>
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
            <Img key={photo.id} src={photo.url} alt="" width="100" height="100" />
          ))}
        </div>
        <div>
          by <BoldedText text={props.answer.answerer_name} shouldBeBold={"Seller"} />
          , {props.answer.date.substr(0, 10)}
          <Dash>|</Dash>
          <Helpful>Helpful?</Helpful>
          <a onClick={handleHelpfulChange}>Yes({answerHelpfulness})</a>
          <Dash>|</Dash>
          <Report />
        </div>
      </div>
    )
  }
  return (
    <div>
      {props.answer.body}
      <div>
        by <BoldedText text={props.answer.answerer_name} shouldBeBold={"Seller"} />,{" "}
        {props.answer.date.substr(0, 10)}
        <Dash>|</Dash>
        <Helpful>Helpful?</Helpful>
        <a onClick={handleHelpfulChange}>Yes({answerHelpfulness})</a>
        <Dash>|</Dash>
        <Report />
      </div>
    </div>
  )
}

export default AnswersListEntry
