import React, { useState, useContext } from 'react';
import axios from 'axios';

export const InteractionsContext = React.createContext();

export const InteractionsContext ({ children }) => {
  const logInteraction = (element, widget, callback) => {
    const logDetails = {
      element,
      widget,
      time: (new Date()).toString()
    }

    axios.post('/interactions', logDetails)
      .then((response) => {
        callback();
      })
      .catch((err) => {
        console.log('Server failed to log client interaction');
      });
  }

  const value = {
    logInteraction,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const useInteractions = () => {
  const {
    logInteraction,
  } = useContext(InteractionsContext);

  return {
    logInteraction,
  };
};

export default useInteractions;