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
<<<<<<< HEAD
=======
    setThemeLoaded(true)
>>>>>>> 26eace1ee93713808e3279d809e6dcce06e9cf66
  }

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes.data, "font"))
    return allFonts
  }

<<<<<<< HEAD
  useEffect(() => {
    const localTheme = getFromStorage("theme")
    // Defualt to theme.data.light
    localTheme ? setTheme(localTheme) : setTheme(themes.data.light)
    setThemeLoaded(true)
  }, [])

  return { theme, themeLoaded, setMode, getFonts }
=======
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
>>>>>>> 26eace1ee93713808e3279d809e6dcce06e9cf66
}
