import React from 'react';
import { screen, render, fireEvent } from '../../../../test-utils.jsx';
import ProductCard from './ProductCard.jsx';
import { ProductsContext } from '../../../../contexts/ProductsContext.jsx';
import sampleProduct from './sampleProduct';

describe('ProductCard', () => {
  let props;
  beforeEach(() => {
    props = { ...sampleProduct };
  });

  test('renders product details from props', () => {
    render(<ProductCard {...props} />);
    expect(screen.getByText('Camo Onesie')).toBeInTheDocument();
    expect(screen.getByText('Jackets')).toBeInTheDocument();
    expect(screen.getByText('$140')).toBeInTheDocument();
  });

  test('renders an image for the product', () => {
    render(<ProductCard {...props} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('accepts a button component from props and renders it', () => {
    const ActionBtn = (
      <button data-testid="actionBtn">EXAMPLE BUTTON TEXT</button>
    );
    render(<ProductCard {...props} ActionBtn={ActionBtn} />);

    expect(screen.getByText('EXAMPLE BUTTON TEXT')).toBeInTheDocument();
  });

  test('clicking updates the currently display product in context', () => {
    // Mock the Context function that should be triggered
    const updateDisplayedProduct = jest.fn();
    render(
      <ProductsContext.Provider value={{ updateDisplayedProduct }}>
        <ProductCard {...props} />
      </ProductsContext.Provider>,
    );

    // Click this product card
    const clickableDetails = screen.getByRole('button');
    fireEvent.click(clickableDetails);

    expect(updateDisplayedProduct).toHaveBeenCalledTimes(1);
  });

  test('clicking updates the detail page to display THIS product', () => {
    render(<ProductCard {...props} />);
    const descText = sampleProduct.description;
    const clickableDetails = screen.getByRole('button');

    fireEvent.click(clickableDetails);

    // State will update 'asynchronously, THEN we can
    // verify that the DOM rendered the new value
    setTimeout(() => {
      expect(screen.getByText(descText)).toBeInTheDocument();
    }, 0);
  });

  test('renders the comparison component on hover', () => {
    render(<ProductCard {...props} />);
    fireEvent.mouseOver(screen.getByText(props.name));

    setTimeout(() => {
      expect(screen.getByRole('figure')).toBeInTheDocument();
      expect(screen.getByText(props.description)).toBeInTheDocument();
    }, 0);

    fireEvent.mouseLeave(screen.getByText(props.name));

    setTimeout(() => {
      expect(screen.getByRole('figure')).not.toBeInTheDocument();
    }, 0);
  });
});
