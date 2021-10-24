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

const SmallDiv = styled.div`
  font-size: small;
  margin-bottom: 10px;
`

const smallA = styled.a`
  font-size: small;
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
    e.preventDefault()
    if (!helpfulnessClicked) {
      context.markAnswerHelpful(props.answer.answer_id, (response) => {
        setAnswerHelpfulness(answerHelpfulness + 1)
        setHelpfulnessClicked(true)
      })
    }
  }

  function handleReport(e) {
    // sends a request to change the value of the report key to true and only allow the click to happen once per visit
    e.preventDefault()
    if (!reportedAnswerClicked) {
      context.reportAnswer(props.answer.answer_id, (response) => {
        setReportedAnswerClicked(true)
      })
    }
  }

  function Report() {
    // function is used to report answer and change report to reported
    if (!reportedAnswerClicked) {
      return (
        <a href="#" onClick={handleReport}>
          Report
        </a>
      )
    } else {
      return (
        <a href="#" onClick={handleReport}>
          Reported
        </a>
      )
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
        <SmallDiv>
          by <BoldedText text={props.answer.answerer_name} shouldBeBold={"Seller"} />
          , {props.answer.date.substr(0, 10)}
          <Dash>|</Dash>
          <Helpful>Helpful?</Helpful>
          <a href="#" onClick={handleHelpfulChange}>
            Yes({answerHelpfulness})
          </a>
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
        by <BoldedText text={props.answer.answerer_name} shouldBeBold={"Seller"} />,{" "}
        {props.answer.date.substr(0, 10)}
        <Dash>|</Dash>
        <Helpful>Helpful?</Helpful>
        <a href="#" onClick={handleHelpfulChange}>
          Yes({answerHelpfulness})
        </a>
        <Dash>|</Dash>
        <Report />
      </SmallDiv>
    </div>
  )
}

export default AnswersListEntry
