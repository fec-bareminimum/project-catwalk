import React from "react"
import styled from "styled-components"

const Icon = styled.p`
  padding: 0em 0.3em;
  font-size: 2em;
  margin: 0;
  color: #9d9d9d;
  font-weight: 900;
  text-shadow: #fff 0px 0px 1px;
  -webkit-font-smoothing: antialiased;
`

const StarIcon = (props) => (
  // <svg
  //   className="starIcon"
  //   width={48}
  //   height={48}
  //   xmlns="http://www.w3.org/2000/svg"
  //   {...props}
  // >
  //   <polygon points="12,3 6,21 21,9 3,9 18,21" />
  // </svg>
  <Icon>&#10025;</Icon>
)

export default StarIcon
