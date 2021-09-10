import React, { useState, useContext } from 'react';
import axios from 'axios';

export const ProductsContext = React.createContext();

export function ProductsContext({ children }) => {
  const [productList, setProducts] = useState({})
  const [productInfo, setProductsInfo] = useState({})
  const [styles, setStyles] = useState({})
  const [relatedProducts, setRelatedProducts] = useState({})


  const fetchProducts = (page, count) => {
    axios.get('/products')
    .then(response => setProducts(response))
    .catch((err) => {
      console.log('Failed to load products', err)
    });
  }

  const fetchProductInfo = (product_id) => {
    axios.get(`/products/${product_id}`)
    .then(response => setProductsInfo(response))
    .catch((err) => {
      console.log('Failed to load products', err)
    });
  }

  const fetchProductStyles = (product_id) => {
    axios.get(`/products/${product_id}/styles`)
    .then(response => setStyles(response))
    .catch((err) => {
      console.log('Failed to load products', err)
    });
  }


  const fetchProductRelatedStyles = (product_id) => {
    axios.get(`/products/${product_id}/related`)
    .then(response => setRelatedProducts(response))
    .catch((err) => {
      console.log('Failed to load products', err)
    });
  }

  const value = {
    productList,
    productInfo,
    styles,
    relatedProducts
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

const useProducts = () => {
  const {
    productList,
    productInfo,
    styles,
    relatedProducts
  } = useContext(ProductsContext);

  return {
    productList,
    productInfo,
    styles,
    relatedProducts
  };
};


export default useProducts;


//TBD

// const useCart = () => {
//   const {
//     loading,
//     cartProducts,
//   } = useContext(CartContext);

//   return {
//     loading,
//     cartProducts,
//   };
// };

// export default useCart;
