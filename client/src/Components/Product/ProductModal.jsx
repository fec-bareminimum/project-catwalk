import React from "react"
import ReactDOM from "react-dom"
import Stylesheet from "./styles.css"

const Backdrop = (props) => {
  return <div className={"backdrop"} onClick={props.onClick}></div>
}

const ModalOverlay = (props) => {
  return (
    <div className={"productmodal"}>
      <div className="modalimage">{props.children}</div>
    </div>
  )
}

const ProductModal = (props) => {
  return (
    <>
      <Backdrop onClick={props.onHideZoom} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  )
}

export default ProductModal
