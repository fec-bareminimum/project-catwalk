import React, { useState, useContext } from 'react';
import axios from 'axios';

export const ProductsContext = React.createContext();

export function ProductsContext({ children }) => {
  const [productList, setProducts] = useState({})
  const [productInfo, setProductsInfo] = useState({})
  const [styles, setStyles] = useState({})
  const [relatedProducts, setRelatedProducts] = useState({})

  const fetchProducts = (page, count, callback) => {
    const productResults = {
      page,
      count
    }
    axios.get('/products', productResults)
      .then((response) => {
        setProducts(response);
        callback(response);
      })
      .catch((err) => {
        console.log('Failed to load products', err)
      });
  }

  const fetchProductInfo = (product_id, callback) => {
    const productInfo = {
      product_id
    }
    axios.get(`/products/${product_id}`, productInfo)
      .then((response) => {
        setProductsInfo(response)
        callback(response)
      })
      .catch((err) => {
        console.log('Failed to load products', err)
      });
  }

  const fetchProductStyles = (product_id, callback) => {
    const styleDetails = {
      product_id
    }
    axios.get(`/products/${product_id}/styles`, styleDetails)
      .then((response) => {
        setStyles(response)
        callback(response)
      })
      .catch((err) => {
        console.log('Failed to load products', err)
      });
  }

  const fetchProductRelatedStyles = (product_id, callback) => {
    const relatedProducts = {
      product_id
    }
    axios.get(`/products/${product_id}/related`, relatedProducts)
      .then((response) => {
        setRelatedProducts(response)
        callback(response)
      })
      .catch((err) => {
        console.log('Failed to load products', err)
      });
  }

  const value = {
    fetchProducts,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedStyles
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

const useProducts = () => {
  const {
    fetchProducts,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedStyles
  } = useContext(ProductsContext);

  return {
    fetchProducts,
    fetchProductInfo,
    fetchProductStyles,
    fetchProductRelatedStyles
  };
};


export default useProducts;

