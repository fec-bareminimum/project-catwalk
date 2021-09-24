import React, { useState, useContext, useEffect } from "react"
import axios from "axios"

export const ProductsContext = React.createContext()

const fetch = (url, params, callback) => {
  axios
    .get(url, params)
    .then((response) => {
      callback(response.data)
    })
    .catch((err) => {
      console.error(`Failed to load ${url}`, err)
    })
}

export const ProductsProvider = ({ children }) => {
  const [productList, _setProductList] = useState([])
  const [displayedProduct, _setDisplayedProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const [relatedProductIds, _setRelatedIds] = useState([])
  const [selectedStyleIndex, _setSelectedStyleIndex] = useState(0)

  const existingListProduct = (productList, productObj) => {
    return productList[productList.map((e) => e.id).indexOf(productObj["id"])]
  }
  //  productList.map((e) => parseInt(e.id) ).indexOf((productObj["id"]))

  const _extendExistingProductInList = (productObj) => {
    setTimeout(() => {
      _setProductList((prevList) => {
        // Also update the displayed product value

        _setDisplayedProduct((prevObj) => {
          if (productObj["id"] === prevObj["id"]) {
            return { ...prevObj, ...productObj }
          } else {
            return prevObj
          }
        })

        if (existingListProduct(prevList, productObj)) {
          return prevList.map((product) =>
            product["id"] !== productObj["id"]
              ? product
              : { ...product, ...productObj }
          )
        } else {
          return [...prevList, productObj]
        }
      })
    }, 0)
  }

  const fetchProducts = (page, count, callback) => {
    fetch("/products", { page, count }, (products) => {
      _setProductList(products)
      updateDisplayedProduct(products[0])

      // extra ---------
      if (callback) {
        callback(products)
      }
      // ---------------
    })
  }

  const fetchProductInfo = (product_id, callback) => {
    fetch(`/products/${product_id}`, { product_id }, (withDetails) => {
      _extendExistingProductInList(withDetails)

      // extra ---------
      if (callback) {
        callback(withDetails)
      }
      // ---------------
    })
  }

  const fetchProductStyles = (product_id, callback) => {
    fetch(`/products/${product_id}/styles`, { product_id }, (stylesObj) => {
      _extendExistingProductInList({ id: product_id, styles: stylesObj })
      // extra ---------
      if (callback) {
        callback(stylesObj)
      }
      // ---------------
    })
  }

  const fetchProductReviews = (product_id, callback) => {
    fetch(`/reviews/meta?product_id=${product_id}`, {}, (reviewsObj) => {
      _extendExistingProductInList({
        id: product_id,
        ratings: reviewsObj["ratings"],
      })
    })
  }

  function memoizer(fn) {
    const cachedResults = {}
    return function (...args) {
      const key = JSON.stringify(args)
      if (!cachedResults[key]) {
        cachedResults[n] = fn(args)
      }
      return cachedResults[key]
    }
  }

  const fetchProductRelatedIds = (product_id) => {
    fetch(`/products/${product_id}/related`, { product_id }, (relatedProducts) => {
      _setRelatedIds(relatedProducts)
      relatedProducts.forEach((id) => {
        fetchProductInfo(id)
        fetchProductStyles(id)
        fetchProductReviews(id)
      })
    })
  }

  const changeSelectedStyleIndex = (newIndex) => {
    _setSelectedStyleIndex(newIndex)
  }

  const updateDisplayedProduct = (newProduct) => {
    if (
      (newProduct && newProduct["id"] !== displayedProduct["id"]) ||
      Object.keys(displayedProduct).length === 0
    ) {
      _setDisplayedProduct(newProduct)
      fetchProductRelatedIds(newProduct["id"])
      fetchProductStyles(newProduct["id"])
      fetchProductInfo(newProduct["id"])
      fetchProductReviews(newProduct["id"])
      changeSelectedStyleIndex(0)
    }
  }

  // Display a defualt product for the Overview
  useEffect(() => {
    fetchProducts()
  }, [])

  const value = {
    loading,
    productList,
    relatedProductIds,
    selectedStyleIndex,
    changeSelectedStyleIndex,
    updateDisplayedProduct,
    fetchProducts,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedIds,
    displayedProduct,
  }

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}

const useProducts = () => useContext(ProductsContext)

export default useProducts
