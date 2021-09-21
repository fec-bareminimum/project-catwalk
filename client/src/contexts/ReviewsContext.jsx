import React, { useState, useContext } from "react"
import axios from "axios"

export const ReviewsContext = React.createContext()

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([])
  const [reviewMetadata, setReviewMetadata] = useState({})
  const [average, setAverage] = useState(0)
  const [count, setCount] = useState(0)

  const fetchReviews = (page, count, sort, product_id, filters) => {
    const fetchDetails = {
      page,
      count,
      sort,
      product_id,
      filters,
    }

    axios({
      url: "/reviews/",
      method: "get",
      params: fetchDetails,
    })
      .then((response) => {
        filters.length === 0
          ? setReviews(response.data.results)
          : setReviews(
              response.data.results.reduce((filtered, current) => {
                filters.forEach((option) => {
                  if (current.rating === option) {
                    filtered.push(current)
                  }
                })
                return filtered
              }, [])
            )
      })
      .catch((err) => {
        console.log("Server failed to fetch all reviews")
      })
  }

  const fetchReviewMetadata = (product_id) => {
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

  const setHelpers = () => {
    let total = 0
    let ct = 0
    let avg = 0

    for (let rating in reviewMetadata.ratings) {
      total += rating * reviewMetadata.ratings[rating]
      ct += 1 * reviewMetadata.ratings[rating]
    }
    if (total > 0) {
      avg = Math.round((total / ct) * 10) / 10
    }

    setCount(ct)
    setAverage(avg)
  }

  const value = {
    reviews,
    reviewMetadata,
    average,
    count,
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
    setHelpers,
  }

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}

const useReviews = () => {
  const {
    reviews,
    reviewMetadata,
    average,
    count,
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
    setHelpers,
  } = useContext(ReviewsContext)

  return {
    reviews,
    reviewMetadata,
    average,
    count,
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
    setHelpers,
  }
}

export default useReviews
