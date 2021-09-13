import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductMainView from './ProductMainView.jsx'


describe('Product', () => {
  test('renders Product component', () => {
    render(<ProductMainView />);
  });
});

describe('Product Title', () => {
  test('Finds the Project Title', () => {
    render(<ProductMainView />);
    expect(screen.getByRole('header')).toBeInTheDocument()
  });
});

describe('Product Price', () => {
  test('Finds the price', () => {
    render(<ProductMainView />);
    expect(screen.getByText('price')).toBeInTheDocument()
  });
});


describe('Ratings', () => {
  test('Ratings', () => {
    render(<ProductMainView />);
    expect(screen.getByText('ratings')).toBeInTheDocument()
  });
});


describe('Cart exists', () => {
  test('Finds the cart', () => {
    render(<ProductMainView />);
    expect(screen.getByRole('Cart')).toBeInTheDocument() ||  expect(screen.getByRole('Bag')).toBeInTheDocument()
  });
});

describe('Quantity selector works', () => {
  test('Quantity selector works', () => {
    render(<ProductMainView />);
    expect(screen.getByText('button')).toBeInTheDocument()
  });
});

// test('General Information displayed at top of Overview'), () => {
//   expect()
// }

