import { useEffect, useState } from "react"
import { setToStorage, getFromStorage } from "../utils/storage"
import _ from "lodash"

export const useTheme = () => {
  const themes = getFromStorage("all-themes")
  const [theme, setTheme] = useState(themes.data.light)
  const [themeLoaded, setThemeLoaded] = useState(false)

  const setMode = (mode) => {
    setToStorage("theme", mode)
    setTheme(mode)
    setThemeLoaded(true)
  }

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes.data, "font"))
    return allFonts
  }

  const toggleTheme = () => {
    const isLightMode = JSON.stringify(theme) === JSON.stringify(themes.data.light)
    let newTheme = theme
    if (isLightMode) {
      newTheme = themes.data.dark
    } else {
      newTheme = themes.data.light
    }
    setTheme(newTheme)
    return newTheme
  }

  useEffect(() => {
    const localTheme = getFromStorage("theme")
    const newTheme = localTheme ? localTheme : themes.data.light
    setTheme(newTheme)
    setThemeLoaded(true)
  }, [])

  return { theme, themeLoaded, setMode, getFonts, toggleTheme }
}