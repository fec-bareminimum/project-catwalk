import React, { useState, useEffect } from "react"
import { ProductsProvider } from "../contexts/ProductsContext.jsx"
import { ReviewsProvider } from "../contexts/ReviewsContext.jsx"
import { InteractionsProvider } from "../contexts/InteractionsContext.jsx"
import Navbar from "./Navbar/Navbar.jsx"
import ProductMainView from "./ProductContainer/ProductMainView.jsx"
import RelatedContainer from "./RelatedContainer/RelatedContainer.jsx"
import QuestionsContainer from "./QuestionsContainer/QuestionsContainer.jsx"
import ReviewsContainer from "./ReviewsContainer/ReviewsContainer.jsx"
import { GlobalStyles } from "../theme/GlobalStyles"
import { ThemeProvider } from "styled-components"
import WebFont from "webfontloader"
import { useTheme } from "../theme/useTheme"
import InfiniteScroll from "react-infinite-scroll-component"

const App = () => {
  const { theme, themeMode, themeLoaded, getFonts, toggleTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(theme)

  useEffect(() => {
    setSelectedTheme(theme)
  }, [themeLoaded])

  const isLightMode = selectedTheme["name"].toLowerCase() === "light"
  return (
    <React.Fragment>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <ProductsProvider>
            <ReviewsProvider>
              <InteractionsProvider>
                <Navbar
                  toggleTheme={() => setSelectedTheme(toggleTheme())}
                  isLightMode={isLightMode}
                />
                <ProductMainView />
                <RelatedContainer />
                <QuestionsContainer />
                <ReviewsContainer />
              </InteractionsProvider>
            </ReviewsProvider>
          </ProductsProvider>
        </ThemeProvider>
      )}
    </React.Fragment>
  )
}

export default App
