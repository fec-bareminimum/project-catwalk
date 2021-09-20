import React from "react"
import { ProductsProvider } from "../contexts/ProductsContext.jsx"
import { ReviewsProvider } from "../contexts/ReviewsContext.jsx"
import { QAProvider } from "../contexts/QAContext.jsx"
import { InteractionsProvider } from "../contexts/InteractionsContext.jsx"
import { CartProvider } from "../contexts/CartContext.jsx"
import RelatedContainer from "./RelatedContainer/RelatedContainer.jsx"
import ProductMainView from "../Components/Product/ProductMainView.jsx"


function App() {
  return (
    <React.Fragment>
      <ProductsProvider>
        <ReviewsProvider>
          <QAProvider>
            <InteractionsProvider>
              <CartProvider>
                <ProductMainView />
                <RelatedContainer />
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
