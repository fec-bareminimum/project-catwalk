import React, { useState, useContext } from "react"
import axios from "axios"

export const ReviewsContext = React.createContext()

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([])
  const [reviewMetadata, setReviewMetadata] = useState({})
  const [filters, setFilters] = useState([])
  const [details, setDetails] = useState({
    Size: [
      "A size too small",
      "½ a size too small",
      "Perfect",
      "½ a size too big",
      "A size too wide",
    ],
    Width: ["Too narrow", "Slightly narrow", "Perfect", "Slightly wide", "Too wide"],
    Comfort: [
      "Uncomfortable",
      "Slightly uncomfortable",
      "Ok",
      "Comfortable",
      "Perfect",
    ],
    Quality: ["Poor", "Below average", "What I expected", "Pretty great", "Perfect"],
    Length: [
      "Runs short",
      "Runs slightly short",
      "Perfect",
      "Runs slightly long",
      "Runs long",
    ],
    Fit: [
      "Runs tight",
      "Runs slightly tight",
      "Perfect",
      "Runs slightly loose",
      "Runs loose",
    ],
  })

  const fetchReviews = (page, count, sort, product_id) => {
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
        setReviews(response.data.results)
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

  const addReview = (addDetails) => {
    axios
      .post("/reviews", addDetails)
      .then((response) => {
        console.log("Review submitted")
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
    filters,
    details,
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
    filters,
    details,
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
  } = useContext(ReviewsContext)

  return {
    reviews,
    reviewMetadata,
    filters,
    details,
    fetchReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview,
  }
}

export default useReviews
