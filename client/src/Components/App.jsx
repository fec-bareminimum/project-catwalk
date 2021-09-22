import React, { useState, useEffect } from "react"
import { ProductsProvider } from "../contexts/ProductsContext.jsx"
import { ReviewsProvider } from "../contexts/ReviewsContext.jsx"
import { QAProvider } from "../contexts/QAContext.jsx"
import { InteractionsProvider } from "../contexts/InteractionsContext.jsx"
import { CartProvider } from "../contexts/CartContext.jsx"
import { OutfitProvider } from "../contexts/OutfitContext.jsx"
import RelatedContainer from "./RelatedContainer/RelatedContainer.jsx"
import QuestionsContainer from "./QuestionsContainer/QuestionsContainer.jsx"
import ReviewsContainer from "./ReviewsContainer/ReviewsContainer.jsx"
import Navbar from "./Navbar/Navbar.jsx"
import { ThemeProvider } from "styled-components"
import WebFont from "webfontloader"
import { GlobalStyles } from "../theme/GlobalStyles"
import { useTheme } from "../theme/useTheme"
import ProductMainView from "./Product/ProductMainView.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  const { theme, themeMode, themeLoaded, getFonts, toggleTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(theme)

  useEffect(() => {
    setSelectedTheme(theme)
  }, [themeLoaded])

  // Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts(),
      },
    })
  })

  const isLightMode = selectedTheme["name"].toLowerCase() === "light"
  return (
    <React.Fragment>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <ProductsProvider>
            <OutfitProvider>
              <ReviewsProvider>
                <QAProvider>
                  <InteractionsProvider>
                    <CartProvider>
                      <Navbar
                        toggleTheme={() => setSelectedTheme(toggleTheme())}
                        isLightMode={isLightMode}
                      />
                      <ProductMainView />
                      <RelatedContainer />
                      <QuestionsContainer />
                      <ReviewsContainer />
                    </CartProvider>
                  </InteractionsProvider>
                </QAProvider>
              </ReviewsProvider>
            </OutfitProvider>
          </ProductsProvider>
        </ThemeProvider>
      )}
    </React.Fragment>
  )
}

export default App
