import React, { useEffect } from "react"
import useInteractions from "../contexts/InteractionsContext.jsx"

const useClickLogger = (Component, widgetName) => {
  const WithClickListener = () => {
    const { logInteraction } = useInteractions()

    const handleClick = (e) => {
      const element = JSON.stringify(e.target.outerHTML)
      logInteraction(element, widgetName, () =>
        console.log("Successfuly logged interaction")
      )
    }

    useEffect(() => {
      window.addEventListener("mouseup", handleClick)
      return () => window.removeEventListener("mouseup", handleClick)
    }, [])

    return <Component />
  }
  return WithClickListener
}

export default useClickLogger
