import React, { useState, useContext } from "react"
import axios from "axios"

export const QAContext = React.createContext()

export const QAProvider = ({ children }) => {
  const [questionsList, setQuestionsList] = useState([])
  const [answersList, setAnswersList] = useState([])

  const fetchQuestions = (product_id, page, count, callback) => {
    const fetchParams = {
      product_id,
      page,
      count,
    }

    axios
      .get("/qa/questions", { params: fetchParams })
      .then((response) => {
        setQuestionsList(response)
        callback(response)
      })
      .catch((err) => {
        console.log("Server failed to collect Questions list")
      })
  }

  const fetchAnswers = (questionId, callback) => {
    const fetchParams = {
      page,
      count,
    }

    axios
      .get(`/qa/questions/${questionId}/answers`, { params: fetchParams })
      .then((response) => {
        setAnswersList(response)
        callback(response)
      })
      .catch((err) => {
        console.log("Server failed to collect Answers list")
      })
  }

  const postQuestion = (body, name, email, product_id, callback) => {
    const addParams = {
      body,
      name,
      email,
      product_id,
    }

    axios
      .post("/qa/questions", addParams)
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to post question")
      })
  }

  const postAnswer = (questionId, body, name, email, photos, callback) => {
    const addParams = {
      body,
      name,
      email,
      photos,
    }

    axios
      .post(`/qa/questions/${questionId}/answers`, addParams)
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to post answer")
      })
  }

  const markQuestionHelpful = (question_id, callback) => {
    const markHelpfulParams = {
      question_id: question_id,
    }

    axios
      .put(`/qa/questions/${question_id}/helpful`, { params: markHelpfulParams })
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to update question helpfulness")
      })
  }

  const reportQuestion = (questionId, callback) => {
    const reportQuestionParams = {
      questionId,
    }

    axios
      .put(`/qa/questions/${questionId}/report`, reportQuestionParams)
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to report question")
      })
  }

  const markAnswerHelpful = (answer_id, callback) => {
    const markAnswerParams = {
      answer_id,
    }

    axios
      .put(`/qa/answers/${answer_id}/helpful`, markAnswerParams)
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to update answer helpfulness")
      })
  }

  const reportAnswer = (answer_id, callback) => {
    const reportAnswerParams = {
      answer_id,
    }

    axios
      .put(`/qa/answers/${answer_id}/report`, reportAnswerParams)
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to report answer")
      })
  }

  const value = {
    questionsList,
    answersList,
    fetchQuestions,
    fetchAnswers,
    postQuestion,
    postAnswer,
    markQuestionHelpful,
    markAnswerHelpful,
    reportQuestion,
    reportAnswer,
  }

  return <QAContext.Provider value={value}>{children}</QAContext.Provider>
}

const useQA = () => {
  const {
    questionsList,
    answersList,
    fetchQuestions,
    fetchAnswers,
    postQuestion,
    postAnswer,
    markQuestionHelpful,
    markAnswerHelpful,
    reportQuestion,
    reportAnswer,
  } = useContext(QAContext)

  return {
    questionsList,
    answersList,
    fetchQuestions,
    fetchAnswers,
    postQuestion,
    postAnswer,
    markQuestionHelpful,
    markAnswerHelpful,
    reportQuestion,
    reportAnswer,
  }
}

export default useQA
