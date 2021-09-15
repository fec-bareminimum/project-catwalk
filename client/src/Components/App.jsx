import React, { useState, useEffect } from "react"
import { ProductsProvider } from "../contexts/ProductsContext.jsx"
import { ReviewsProvider } from "../contexts/ReviewsContext.jsx"
import { QAProvider } from "../contexts/QAContext.jsx"
import { InteractionsProvider } from "../contexts/InteractionsContext.jsx"
import { CartProvider } from "../contexts/CartContext.jsx"
import RelatedContainer from "./RelatedContainer/RelatedContainer.jsx"
import { ThemeProvider } from "styled-components"
import WebFont from "webfontloader"
import { GlobalStyles } from "../theme/GlobalStyles"
import { useTheme } from "../theme/useTheme"

const App = () => {
  const { theme, themeLoaded, getFonts } = useTheme()
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

  return (
    <React.Fragment>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />

          <ProductsProvider>
            <ReviewsProvider>
              <QAProvider>
                <InteractionsProvider>
                  <CartProvider>
                    <RelatedContainer />
                    {/* <QAContainer /> */}
                    {/* <OverviewContainer /> */}
                    {/* <ReviewsContainer /> */}
                  </CartProvider>
                </InteractionsProvider>
              </QAProvider>
            </ReviewsProvider>
          </ProductsProvider>
        </ThemeProvider>
      )}
    </React.Fragment>
  )
}

export default App
