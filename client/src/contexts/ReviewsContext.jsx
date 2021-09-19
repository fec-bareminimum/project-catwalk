import React, { useState, useContext } from "react"
import axios from "axios"

export const ReviewsContext = React.createContext()

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState({})
  const [reviewMetadata, setReviewMetadata] = useState({})

  const fetchReviews = (page, count, sort, product_id, callback) => {
    const fetchDetails = {
      page,
      count,
      sort,
      product_id,
    }

    axios({
      url: "/reviews/",
      method: "get",
      params: fetchDetails,
    })
      .then((response) => {
        setReviews(response.data)
        callback(response.data)
      })
      .catch((err) => {
        console.log("Server failed to fetch all reviews")
      })
  }

  const fetchReviewMetadata = (product_id, callback) => {
    const fetchDetails = {
      product_id,
    }

    axios({
      url: "/reviews/meta",
      method: "get",
      params: fetchDetails,
    })
      .then((response) => {
        setReviewMetadata(response.data)
        callback(response.data)
      })
      .catch((err) => {
        console.log("Server failed to fetch review metadata")
      })
  }

  const addReview = (
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics,
    callback
  ) => {
    const addDetails = {
      product_id,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
      callback,
    }

    axios
      .post("/reviews", addDetails)
      .then((response) => {
        callback(response)
      })
      .catch((err) => {
        console.log("Server failed to post review")
      })
  }

  const markReviewHelpful = (review_id) => {
    const markDetails = {
      review_id,
    }

    axios
      .put(`/reviews/${review_id}/helpful`, markDetails)
      .then((response) => {
        console.log("Review marked as helpful")
      })
      .catch((err) => {
        console.log("Server failed to mark review as helpful")
      })
  }

  const reportReview = (review_id) => {
    const reportDetails = {
      review_id,
    }

    axios
      .put(`/reviews/${review_id}/report`)
      .then((response) => {
        console.log("Review reported")
      })
      .catch((err) => {
        console.log("Server failed to report review")
      })
  }

  const value = {
    reviews,
    reviewMetadata,
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
  }

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}

const useReviews = () => {
  const {
    reviews,
    reviewMetadata,
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
  } = useContext(ReviewsContext)

  return {
    reviews,
    reviewMetadata,
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
  }
}

export default useReviews
