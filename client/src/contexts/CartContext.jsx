import React, { useState, useContext, useEffect } from "react"
import axios from "axios"

export const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const addProductToCart = (skuId, callback) => {
    axios
      .post("/cart", { sku_id: skuId, user_token: 12345 })
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to save item to cart")
      })
  }

  const fetchCartProducts = (callback) => {
    axios
      .get("/cart", { user_token: 12345 })
      .then((result) => {
        setCartProducts(result.data)
        console.log(result)
        callback(result.data)
      })
      .catch((err) => {
        console.log("Server failed to fetch cart products")
      })
  }

  useEffect(() => {
    fetchCartProducts()
  }, [])

  const value = {
    cartProducts,
    fetchCartProducts,
    addProductToCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const useCart = () => useContext(CartContext)

export default useCart
