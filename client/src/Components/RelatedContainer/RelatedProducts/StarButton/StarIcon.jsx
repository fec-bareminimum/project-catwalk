import React from "react"

function SvgComponent(props) {
  return (
    <svg
      className="starIcon"
      width={48}
      height={1}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd" />
    </svg>
  )
}

export default SvgComponent
