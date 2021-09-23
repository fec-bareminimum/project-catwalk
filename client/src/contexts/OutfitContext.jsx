import React, { useState, useContext, useEffect } from "react"
import axios from "axios"

export const OutfitContext = React.createContext()

export const OutfitProvider = ({ children }) => {
  const storageKey = "outfitList"
  const [loading, setLoading] = useState(false)
  const [outfitList, setOutfitList] = useState([])

  const _retreiveOutfitList = () => {
    const storedList = JSON.parse(localStorage.getItem(storageKey))
    if (storedList instanceof Object) {
      return storedList
    } else {
      return {}
    }
  }

  const _syncOutfitList = () => {
    setOutfitList(Object.values(_retreiveOutfitList()))
  }

  const addProductToOutfit = (product) => {
    const newList = _retreiveOutfitList()
    newList[product["id"]] = product
    localStorage.setItem(storageKey, JSON.stringify(newList))

    _syncOutfitList()
  }

  const removeProductFromOutfit = (oldProduct) => {
    const newList = _retreiveOutfitList()
    delete newList[oldProduct["id"]]
    localStorage.setItem(storageKey, JSON.stringify(newList))

    _syncOutfitList()
  }

  useEffect(() => {
    _syncOutfitList()
  }, [])

  const value = {
    outfitList,
    loading,
    removeProductFromOutfit,
    addProductToOutfit,
  }

  return <OutfitContext.Provider value={value}>{children}</OutfitContext.Provider>
}

const useOutfit = () => useContext(OutfitContext)

export default useOutfit
