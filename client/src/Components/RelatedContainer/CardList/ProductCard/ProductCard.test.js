import React from 'react';
import { screen, render } from '@testing-library/react';
import ProductCard from './ProductCard.jsx';
import sampleProduct from './sampleProduct';

describe('ProductCard', () => {
  let props;

  // accepts an action button to display

  // handles logic for hovering for price comparison
  // handles some logic for clicking action button
  // handles some logic for changing the page to display this product

  beforeEach(() => {
    // Refresh the props object before each test
    props = Object.assign({}, sampleProduct);
  });

  test('renders ProductCard component', () => {
    render(<ProductCard {...props} />);
  });

  test('renders product details from props', () => {
    render(<ProductCard {...props} />);

    expect(screen.getByText('Camo Onesie')).toBeTruthy();
    expect(screen.getByText('Jackets')).toBeTruthy();
    expect(screen.getByText('$140')).toBeTruthy();
    expect(screen.getByRole('img')).toBeTruthy();
  });
});
