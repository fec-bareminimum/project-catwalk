import React, { useState, useContext } from "react"
import axios from "axios"

export const InteractionsContext = React.createContext()

export const InteractionsProvider = ({ children }) => {
  const logInteraction = (element, widget, callback) => {
    const logDetails = {
      element,
      widget,
      time: JSON.stringify(new Date()),
    }

    axios
      .post("/interactions", logDetails)
      .then((response) => {
        callback()
      })
      .catch((err) => {
        console.log("Server failed to log client interaction")
      })
  }

  const value = {
    logInteraction,
  }

  return (
    <InteractionsContext.Provider value={value}>
      {children}
    </InteractionsContext.Provider>
  )
}

const useInteractions = () => {
  const { logInteraction } = useContext(InteractionsContext)

  return {
    logInteraction,
  }
}

export default useInteractions
