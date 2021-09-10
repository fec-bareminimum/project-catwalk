import React, { useState, useContext } from 'react';
import axios from 'axios';

export const ProductsContext = React.createContext();

export function ProductsContext({ children }) => {
  const [loadProducts, setProducts] = useState({})
  const [loadProductsInfo, setProductsInfo] = useState({})
  const [loadStyles, setStyles] = useState({})
  const [loadRelatedProducts, setRelatedProducts] = useState({})


  const fetchProducts = (page, count) => {
    axios.get('/products')
    .then(response => setProducts(response))
    .catch((err) => {
      console.log('Failed to load products', err)
    });
  }

  const fetchProductInfo = (product_id) => {
    axios.get('/products/:product_id')
    .then(response => setProductsInfo(response))
    .catch((err) => {
      console.log('Failed to load products', err)
    });
  }

  const fetchProductStyles = (product_id) => {
    axios.get('/products/:product_id/styles')
    .then(response => setStyles(response))
    .catch((err) => {
      console.log('Failed to load products', err)
    });
  }


  const fetchProductRelatedStyles = (product_id) => {
    axios.get('/products/:product_id/related)
    .then(response => setRelatedProducts(response))
    .catch((err) => {
      console.log('Failed to load products', err)
    });
  }

  const value = {
    loadProducts,
    loadProductInfo,
    loadStyles,
    loadRelatedProducts
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

const useProducts = () => {
  const {
    loadProducts,
    loadProductInfo,
    loadStyles,
    loadRelatedProducts
  } = useContext(ProductsContext);

  return {
    loadProducts,
    loadProductInfo,
    loadStyles,
    loadRelatedProducts
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
