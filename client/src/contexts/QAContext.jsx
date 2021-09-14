import React, { useState, useContext } from "react"
import axios from "axios"

export const QAContext = React.createContext()

export const QAProvider = ({ children }) => {
  const [questionsList, setQuestionsList] = useState([])
  const [answersList, setAnswersList] = useState([])

  const fetchQuestions = (productId, page, count, callback) => {
    const fetchParams = {
      productId,
      page,
      count,
    }

    axios
      .get("/qa/questions", fetchParams)
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
      .get(`/qa/questions/${questionID}/answers`, fetchParams)
      .then((response) => {
        setAnswersList(response)
        callback(response)
      })
      .catch((err) => {
        console.log("Server failed to collect Answers list")
      })
  }

  const postQuestion = (body, name, email, productId, callback) => {
    const addParams = {
      body,
      name,
      email,
      productId,
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

  const markQuestionHelpful = (questionId, callback) => {
    const markHelpfulParams = {
      questionId,
    }

    axios
      .put(`/qa/questions/${questionId}/helpful`, markHelpfulParams)
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

  const markAnswerHelpful = (answerId, callback) => {
    const markAnswerParams = {
      answerId,
    }

    axios
      .put(`/qa/answers/${answerId}/helpful`, markAnswerParams)
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to update answer helpfulness")
      })
  }

  const reportAnswer = (answerId, callback) => {
    const reportAnswerParams = {
      answerId,
    }

    axios
      .put(`/qa/answers/${answerId}/report`, reportAnswerParams)
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to report answer")
      })
  }

  const value = {
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
