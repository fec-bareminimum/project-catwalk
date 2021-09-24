/* eslint-disable react/jsx-key */
import React, { useState, useContext } from "react"
import { Row, Col, Dropdown, Button, DropdownButton, Form } from "react-bootstrap"
import { CartContext } from "../../../contexts/CartContext.jsx"
import uniqid from "uniqid"
import Stylesheet from "../styles.css"
import styled from "styled-components"

const Button1 = styled.button`
  margin-right: 15px;
  border-radius: 0px;
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
`

function ProductForm(props) {
  const cartCtx = useContext(CartContext)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedSKU, setSelectedSKU] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [openStyle, setOpenStyle] = useState(false)
  const [counter, setCounter] = useState(0)
  const [out, setOut] = useState("OUT OF STOCK")

  const sizeChangeHandler = (e) => {
    e.preventDefault()
    setSelectedSize(e.target.value)
    const skus = Object.entries(props.selectedStyle.skus)
    const selectedSkuArray = skus
      .map((item) => {
        return { sku: item[0], data: item[1] }
      })
      .filter((item) => item.data.size === e.target.value)
    setSelectedSKU(selectedSkuArray[0])
    setOpenStyle(false)
  }

  const quantityChangeHandler = (e) => {
    e.preventDefault()
    setSelectedQuantity(e.target.value)
  }

  let quantityArray = []
  if (selectedSKU) {
    quantityArray =
      selectedSKU.data.quantity > 15
        ? [...Array(...Array(16).keys())]
        : [...Array(...Array(selectedSKU.data.quantity + 1).keys())]
    quantityArray = [...quantityArray].slice(1)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (selectedSize === "" && openStyle === false) {
      setOpenStyle(true)
    }
    if (openStyle === false && selectedSize !== "") {
      alert(`Successfully added ${selectedQuantity} products to cart`)
      for (var i = 0; i < selectedQuantity; i++) {
        cartCtx.addProductToCart(selectedSKU.sku)
      }
      clearInput()
    }
  }

  const clearInput = () => {
    setSelectedQuantity("")
    setSelectedSize("")
    setOpenStyle(false)
  }

  return (
    <div>
      <div className={`${openStyle === true ? "warning" : "invisible"}`}>
        Please select size
      </div>
      <form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Select
              aria-label="Default"
              variant="outline-dark"
              id="dropdown-item-button"
              title="Select Size"
              className="w-30 p-0.5 mt-1"
              value={selectedSize}
              onChange={sizeChangeHandler}
            >
              <option>Select Size </option>
              {props.selectedStyle &&
                Object.keys(props.selectedStyle.skus).map((item, i) => (
                  <option value={props.selectedStyle.skus[item].size} key={i}>
                    {props.selectedStyle.skus[item].size}
                  </option>
                ))}
            </Form.Select>
          </Col>
          <Col>
            {selectedSize === "" ? (
              <Form.Select
                variant="outline-dark"
                className="w-30 p-0.5 mt-1 d-none"
                title={selectedQuantity}
              />
            ) : (
              <Form.Select
                aria-label="Default"
                variant="outline-dark"
                id="dropdown-item-button"
                title="Select Quantity"
                className="w-30 p-0.5 mt-1"
                value={selectedQuantity}
                onChange={quantityChangeHandler}
              >
                {selectedSKU &&
                  quantityArray.map((item) => (
                    <option key={uniqid()} value={item}>
                      {item}
                    </option>
                  ))}
              </Form.Select>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-grid gap-2" bg="white" style={{ color: "grey" }}>
              <Button1>
                <Button
                  bg="white"
                  size="lg"
                  variant="secondary"
                  className="d-grid gap-2 w-30 mt-3 p-0.5 p-0.5"
                  onClick={submitHandler}
                >
                  Add To Bag
                </Button>
              </Button1>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  )
}

export default ProductForm
