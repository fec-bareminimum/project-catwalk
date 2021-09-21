/* eslint-disable react/jsx-key */
import React, { useState, useContext } from "react"
import { Row, Col, Dropdown, Button, DropdownButton, Form } from "react-bootstrap"
import { CartContext } from "../../../contexts/CartContext.jsx"
import uniqid from "uniqid"
import Stylesheet from "../styles.css"

function ProductForm(props) {
  const cartCtx = useContext(CartContext)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedSKU, setSelectedSKU] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [out, setOut] = useState("OUT OF STOCK")

  const sizeChangeHandler = (e) => {
    e.preventDefault()
    setSelectedSize(e.target.value)
    const skus = Object.entries(props.selectedStyle.skus)
    console.log(skus)
    const selectedSkuArray = skus
      .map((item) => {
        return { sku: item[0], data: item[1] }
      })
      .filter((item) => item.data.size === e.target.value)
    console.log(selectedSkuArray)
    setSelectedSKU(selectedSkuArray[0])
  }

  const quantityChangeHandler = (e) => {
    e.preventDefault()
    setSelectedQuantity(e.target.value)
    console.log(e.target.value)
    // quantityCombinations(selectedSize)
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
    for (var i = 0; i < selectedQuantity; i++) {
      cartCtx.addProductToCart(selectedSKU.sku, () =>
        alert("ADDED SOMETHING TO CART")
      )
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Select
              aria-label="Default"
              variant="outline-dark"
              id="dropdown-item-button"
              title="Select Size"
              className="w-30 p-0.5 mt-5"
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
                className="w-30 p-0.5 mt-5 d-none"
                title={selectedQuantity}
              />
            ) : (
              <Form.Select
                aria-label="Default"
                variant="outline-dark"
                id="dropdown-item-button"
                title="Select Quantity"
                className="w-30 p-0.5 mt-5"
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
            <Button
              size="lg"
              variant="outline-dark"
              className="w-30 mt-3 p-0.5 p-0.5"
              onClick={submitHandler}
            >
              Add To Bag
            </Button>
          </Col>
          <Col>
            <button className="btn btn-outline-dark mt-3 w-30 p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-star"
                viewBox="0 0 16 16"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
              </svg>
            </button>
          </Col>
        </Row>
      </form>
    </div>
  )
}

export default ProductForm
