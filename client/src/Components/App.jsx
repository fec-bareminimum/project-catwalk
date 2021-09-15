import React from "react"
import { ProductsProvider } from "../contexts/ProductsContext.jsx"
import { ReviewsProvider } from "../contexts/ReviewsContext.jsx"
import { QAProvider } from "../contexts/QAContext.jsx"
import { InteractionsProvider } from "../contexts/InteractionsContext.jsx"
import { CartProvider } from "../contexts/CartContext.jsx"
import RelatedContainer from "./RelatedContainer/RelatedContainer.jsx"
import styled from "styled-components"

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

function App() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default App
