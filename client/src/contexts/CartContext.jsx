import React, { useState, useContext } from "react"
import axios from "axios"

export const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const addProductToCart = (skuId, callback) => {
    axios
      .post("/cart", {sku_id: skuId })
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log(err)
        console.log("Server failed to save item to cart")
      })
  }

  const fetchCartProducts = (callback) => {
    axios
      .get("/cart")
      .then((products) => {
        setCartProducts(products)
        callback(products)
      })
      .catch((err) => {
        console.log("Server failed to fetch cart products")
      })
  }

  const value = {
    fetchCartProducts,
    addProductToCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const useCart = () => {
  const { fetchCartProducts, addProductToCart } = useContext(CartContext)

  return {
    fetchCartProducts,
    addProductToCart,
  }
}

export default useCart
