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
  }

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes.data, "font"))
    return allFonts
  }

  useEffect(() => {
    const localTheme = getFromStorage("theme")
    // Defualt to theme.data.light
    localTheme ? setTheme(localTheme) : setTheme(themes.data.light)
    setThemeLoaded(true)
  }, [])

  return { theme, themeLoaded, setMode, getFonts }
}
