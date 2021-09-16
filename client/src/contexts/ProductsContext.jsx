import React, { useState, useContext } from "react"
import axios from "axios"

export const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [productList, setProducts] = useState({})
  const [displayedProduct, setDisplayedProduct] = useState({})
  const [productInfo, setProductsInfo] = useState({})
  const [styles, setStyles] = useState({})
  const [relatedProducts, setRelatedProducts] = useState({})

  const fetchProducts = (page, count, callback) => {
    const productResults = {
      page,
      count,
    }
    axios
      .get("/products", productResults)
      .then((response) => {
        setProducts(response)
        callback(response)
      })
      .catch((err) => {
        console.log("Failed to load products", err)
      })
  }

  const fetchProductInfo = (productId, callback) => {
    const infoBody = {
      productId,
    }
    axios
      .get(`/products/${productId}`, infoBody)
      .then((response) => {
        setProductsInfo(response)
        callback(response)
      })
      .catch((err) => {
        console.log("Failed to load products", err)
      })
  }

  const fetchProductStyles = (productId, callback) => {
    const styleDetails = {
      productId,
    }
    axios
      .get(`/products/${productId}/styles`, styleDetails)
      .then((response) => {
        setStyles(response)
        callback(response)
      })
      .catch((err) => {
        console.log("Failed to load products", err)
      })
  }

  const fetchProductRelatedStyles = (productId, callback) => {
    const relatedBody = {
      productId,
    }
    axios
      .get(`/products/${productId}/related`, relatedBody)
      .then((response) => {
        setRelatedProducts(response)
        callback(response)
      })
      .catch((err) => {
        console.log("Failed to load products", err)
      })
  }

  const value = {
    displayedProduct,
    fetchProducts,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedStyles,
  }

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}

const useProducts = () => {
  const {
    productList,
    displayedProduct,
    fetchProducts,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedStyles,
  } = useContext(ProductsContext)

  return {
    productList,
    displayedProduct,
    fetchProducts,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedStyles,
  }
}

export default useProducts
