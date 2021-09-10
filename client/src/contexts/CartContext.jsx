import React, { useState, useContext } from 'react';
import axios from 'axios';

export const CartContext = React.createContext();

export const CartContext ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const addProductToCart = (sku_id, callback) => {
    axios.post('/cart', { sku_id })
      .then((response) => {
        callback();
      })
      .catch((err) => {
        console.log('Server failed to save item to cart');
      });
  }

  const fetchCartProducts = (callback) => {
    axios.get('/cart')
      .then((cartProducts) => {
        setCartProducts(cartProducts);
        callback(cartProducts);
      })
      .catch((err) => {
        console.log('Server failed to fetch cart products');
      });
  }

  const value = {
    fetchCartProducts,
    addProductToCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const useCart = () => {
  const {
    fetchCartProducts,
    addProductToCart
  } = useContext(CartContext);

  return {
    fetchCartProducts,
    addProductToCart
  };
};

export default useCart;