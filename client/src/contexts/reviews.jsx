import React, { useState, useContext } from 'react';
import axios from 'axios';

export const ReviewsContext = React.createContext();

export const ReviewsProvider({ children }) => {
  const fetchAllReviews = (page, count, sort, product_id, callback) => {
    const fetchDetails = {
      page,
      count,
      sort,
      product_id
    }

    axios.get('/reviews/', fetchDetails)
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        console.log('Server failed to fetch all reviews');
      });
  }

  const fetchReviewMetadata = (product_id, callback) => {
    const fetchDetails = {
      product_id
    }

    axios.get('/reviews/meta', fetchDetails)
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        console.log('Server failed to fetch review metadata');
      });
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
      callback
    }

    axios.post('/reviews', addDetails)
      .then((response) => {
        callback(response);
      }
      .catch((err) => {
        console.log('Server failed to post review')
      });
  }

  const markReviewHelpful = (review_id) => {
    const markDetails = {
      review_id
    }

    axios.put(`/reviews/${review_id}/helpful`, callback)
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        console.log('Server failed to mark review as helpful')
      });
  }

  const reportReview = (review_id) => {
    const reportDetails = {
      review_id
    }

    axios.put(`/reviews/${review_id}/report`, callback)
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        console.log('Server failed to report review')
      });
  }

  const value = {
    fetchAllReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview
  };

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}

const useReviews = () => {
  const {
    fetchAllReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview
   } = useReviews(ReviewsContext);

   return {
    fetchAllReviews,
    fetchReviewMetadata,
    addReview,
    markReviewHelpful,
    reportReview
   };
};

export default useReviews;