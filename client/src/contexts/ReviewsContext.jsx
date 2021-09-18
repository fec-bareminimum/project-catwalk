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
