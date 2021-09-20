import React, { useState, useContext } from "react"
import axios from "axios"

export const ReviewsContext = React.createContext()

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState({})
  const [reviewMetadata, setReviewMetadata] = useState({})

  const fetchReviews = (page, count, sort, productId, callback) => {
    const fetchDetails = {
      page,
      count,
      sort,
      productId,
    }

    axios
      .get("/reviews/", fetchDetails)
      .then((response) => {
        setReviews(response)
        callback(response)
      })
      .catch((err) => {
        console.log("Server failed to fetch all reviews")
      })
  }

  const fetchReviewMetadata = (productId, callback) => {
    const fetchDetails = {
      productId,
    }

    axios
      .get("/reviews/meta", fetchDetails)
      .then((response) => {
        setReviewMetadata(response)
        callback(response)
      })
      .catch((err) => {
        console.log("Server failed to fetch review metadata")
      })
  }

  const addReview = (
    productId,
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
      productId,
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

  const markReviewHelpful = (reviewId, callback) => {
    const markDetails = {
      reviewId,
    }

    axios
      .put(`/reviews/${reviewId}/helpful`, markDetails)
      .then((response) => {
        callback(response)
      })
      .catch((err) => {
        console.log("Server failed to mark review as helpful")
      })
  }

  const reportReview = (reviewId, callback) => {
    const reportDetails = {
      reviewId,
    }

    axios
      .put(`/reviews/${reviewId}/report`, callback)
      .then((response) => {
        callback(response)
      })
      .catch((err) => {
        console.log("Server failed to report review")
      })
  }

  const value = {
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
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
  } = useContext(ReviewsContext)

  return {
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
  }
}

export default useReviews
