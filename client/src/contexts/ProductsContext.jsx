import React, { useState, useContext } from "react"
import axios from "axios"

export const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [productList, _setProductList] = useState([])
  const [displayedProduct, _setDisplayedProduct] = useState({}) // Reference an object in the productList array
  const [relatedProducts, _setRelatedProducts] = useState([])
  const [selectedStyleIndex, _setSelectedStyleIndex] = useState(0)

  // Display a defualt product for the Overview
  useEffect(() => {
    if (Object.keys(displayedProduct).length === 0 && productList.length > 0) {
      // Reference the object in productList
      _setDisplayedProduct(productList[0])
    }
  }, [productList])

  const fetchProducts = (page, count, callback) => {
    const productResults = {
      page,
      count,
    }
    axios
      .get("/products", productResults)
      .then((response) => {
        _setProductList(response)
        if (callback) {
          callback(response)
        }
      })
      .catch((err) => {
        console.log("Failed to load products", err)
      })
  }

  const _extendExistingProductInList = (productObj) => {
    // If we have NEW data, EXTENED the exisiting object in productList

    // Search the productList
    const existingIndex = productList.map((e) => e.id).indexOf(productObj["id"])
    if (existingIndex) {
      _setProductList((prevList) =>
        prevList.map((product) =>
          product["id"] === productObj["id"]
            ? { ...product, ...productObj }
            : product
        )
      )
      // this could be the display product reference
      updateDisplayedProduct(productList[existingIndex])
    } else {
      // Can't find the item? Push it to the end of the array
      _setProductList((prevList) => [...prevList, productObj])
    }
  }

  const fetchProductInfo = (productId, callback) => {
    const infoBody = {
      productId,
    }
    axios
      .get(`/products/${productId}`, infoBody)
      .then((response) => {
        _extendExistingProductInList(response)
        if (callback) {
          callback(response)
        }
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
        _extendExistingProductInList(response)
        if (callback) {
          callback(response)
        }
      })
      .catch((err) => {
        console.log("Failed to load products", err)
      })
  }

  const fetchProductRelatedIds = (productId, callback) => {
    const relatedBody = {
      productId,
    }
    axios
      .get(`/products/${productId}/related`, relatedBody)
      .then((response) => {
        _setRelatedProducts(response)
        if (callback) {
          callback(response)
        }
      })
      .catch((err) => {
        console.log("Failed to load products", err)
      })
  }

  const changeSelectedStyleIndex = (newIndex) => {
    _setSelectedStyleIndex(newIndex)
  }

  const updateDisplayedProduct = (newProduct) => {
    // Find the index in productList
    const existingIndex = productList.map((e) => e.id).indexOf(productObj["id"])

    // Reference an object in the productList array
    setDisplayProduct(productList[existingIndex] || newProduct)
    changeSelectedStyleIndex(0)
  }

  const value = {
    productList,
    relatedProducts,
    selectedStyleIndex,
    changeSelectedStyleIndex,
    displayedProduct,
    updateDisplayedProduct,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedIds,
  }

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}

const useProducts = () => {
  const {
    productList,
    relatedProducts,
    selectedStyleIndex,
    displayedProduct,
    updateDisplayedProduct,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedIds,
  } = useContext(ProductsContext)

  return {
    productList,
    relatedProducts,
    selectedStyleIndex,
    displayedProduct,
    updateDisplayedProduct,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedIds,
  }
}

export default useProducts
