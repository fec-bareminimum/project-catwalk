import React, { useState, useContext, useEffect } from "react"
import axios from "axios"

import sampleProductList from "../__mocks__/sampleProductList"

export const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [productList, _setProductList] = useState(sampleProductList) // [])
  const [displayedProduct, _setDisplayedProduct] = useState(sampleProductList[0]) // {})
  // Reference an object in the productList array
  const [relatedProductIds, _setRelatedIds] = useState([])
  const [selectedStyleIndex, _setSelectedStyleIndex] = useState(0)

  const fetchProducts = (page, count, callback) => {
    const productResults = {
      page,
      count,
    }
    axios
      .get("/products", productResults)
      .then((response) => {
        _setProductList(response.data)
        if (callback) {
          callback(response.data)
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
    if (existingIndex > -1) {
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

  const fetchProductInfo = (product_id, callback) => {
    const infoBody = {
      product_id,
    }
    axios
      .get(`/products/${product_id}`, infoBody)
      .then((response) => {
        _extendExistingProductInList(response.data)
        if (callback) {
          callback(response.data)
        }
      })
      .catch((err) => {
        console.log("Failed to load products", err)
      })
  }

  const fetchProductStyles = (product_id, callback) => {
    const styleDetails = {
      product_id,
    }
    axios
      .get(`/products/${product_id}/styles`, styleDetails)
      .then((response) => {
        _extendExistingProductInList({ id: product_id, styles: response.data })
        if (callback) {
          callback({ id: product_id, styles: response.data })
        }
      })
      .catch((err) => {
        console.log("Failed to load products", err)
      })
  }

  const fetchProductRelatedIds = (product_id, callback) => {
    const relatedBody = {
      product_id,
    }
    axios
      .get(`/products/${product_id}/related`, relatedBody)
      .then((response) => {
        _setRelatedIds(response.data)

        response.data.forEach((id) => {
          fetchProductInfo(id)
          fetchProductStyles(id)
        })

        if (callback) {
          callback(response)
        }
      })
      .catch((err) => {
        console.log("Failed to load related", err)
      })
  }

  const changeSelectedStyleIndex = (newIndex) => {
    _setSelectedStyleIndex(newIndex)
  }

  const updateDisplayedProduct = (newProduct) => {
    console.log(newProduct ? newProduct["id"] : newProduct)
    // if (newProduct && newProduct["id"] !== displayedProduct["id"]) {
    //   // Find the index in productList
    //   const existingIndex = productList.map((e) => e.id).indexOf(newProduct["id"])

    //   // Reference an object in the productList array
    //   _setDisplayedProduct(productList[existingIndex] || newProduct)

    //   fetchProductRelatedIds(newProduct["id"])

    //   console.log('this is repeating a lot')

    //   changeSelectedStyleIndex(0)
    // }
  }

  // Display a defualt product for the Overview
  // useEffect(() => {
  //   fetchProducts()
  // }, [])

  useEffect(() => {
    if (displayedProduct["id"]) {
      fetchProductRelatedIds(displayedProduct["id"])
    }
  }, [displayedProduct])

  const value = {
    productList,
    relatedProductIds,
    selectedStyleIndex,
    changeSelectedStyleIndex,
    displayedProduct,
    updateDisplayedProduct,
    fetchProducts,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedIds,
  }

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}

const useProducts = () => useContext(ProductsContext)

export default useProducts
