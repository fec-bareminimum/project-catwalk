import React, { useState, useEffect } from "react"
import StarRatings from "react-star-ratings"
import axios from "axios"
import Stylesheet from "../styles.css"

function Star({ average }) {
  return (
    <div className="star-rating">
      <StarRatings
        starSpacing={"2px"}
        rating={3.5}
        starRatedColor="rgb(0,0,0)"
        numberOfStars={5}
        starDimension="15px"
      />
    </div>
  )
}

export default Star
