import React from 'react';
import { render } from '@testing-library/react';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import { ReviewsProvider } from './contexts/ReviewsContext.jsx';
import { QAProvider } from './contexts/QAContext.jsx';
import { InteractionsProvider } from './contexts/InteractionsContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

const AllProviders = ({ children }) => {
  return (
    <ProductsProvider>
      <ReviewsProvider>
        <QAProvider>
          <InteractionsProvider>
            <CartProvider>
              { children }
            </CartProvider>
          </InteractionsProvider>
        </QAProvider>
      </ReviewsProvider>
    </ProductsProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
