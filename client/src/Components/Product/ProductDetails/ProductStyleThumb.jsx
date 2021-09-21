import React from "react"
import { Image } from "react-bootstrap"
import Stylesheet from "../styles.css"

function ProductStyleThumb(props) {
  const clickHandler = (event) => {
    props.updateStyle(props.id)
  }

  return (
    <>
      {props.selectedStyle && props.selectedStyle.style_id === props.id && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="55"
          height="55"
          fill="currentColor"
          fillOpacity="1"
          className="position-absolute ms-2 bi ml-2 bi-check-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
        </svg>
      )}
      <Image className="styleThumb" src={props.item} onClick={clickHandler} />
    </>
  )
}

export default ProductStyleThumb