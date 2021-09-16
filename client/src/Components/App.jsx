import React, { useState, useEffect } from "react"
import { ProductsProvider } from "../contexts/ProductsContext.jsx"
import { ReviewsProvider } from "../contexts/ReviewsContext.jsx"
import { QAProvider } from "../contexts/QAContext.jsx"
import { InteractionsProvider } from "../contexts/InteractionsContext.jsx"
import { CartProvider } from "../contexts/CartContext.jsx"
import RelatedContainer from "./RelatedContainer/RelatedContainer.jsx"
<<<<<<< HEAD
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
=======
import styled from "styled-components"

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`
>>>>>>> main

  return (
    <React.Fragment>
<<<<<<< HEAD
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
=======
      <ProductsProvider>
        <ReviewsProvider>
          <QAProvider>
            <InteractionsProvider>
              <CartProvider>
                <RelatedContainer />
                <Title>Hello World!</Title>
                {/* <QAContainer /> */}
                {/* <OverviewContainer /> */}
                {/* <ReviewsContainer /> */}
              </CartProvider>
            </InteractionsProvider>
          </QAProvider>
        </ReviewsProvider>
      </ProductsProvider>
>>>>>>> main
    </React.Fragment>
  )
}

export default App
