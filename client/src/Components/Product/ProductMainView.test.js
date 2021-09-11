import React from 'react';
import {render, screen} from '@testing-library/react';
import ProductMainView from './ProductMainView.jsx';
// import '@testing-library/jest-dom';


describe('Product', () => {
  test('renders Product component', () => {
    render(<Product />);
  });
});

describe('Product Title', () => {
  test('Finds the Project Title', () => {
    render(<Product />);
    expect(screen.getByRole('header')).toBeInTheDocument()
  });
});

describe('Product Price', () => {
  test('Finds the price', () => {
    render(<Product />);
    expect(screen.getByText('price')).toBeInTheDocument()
  });
});


describe('Ratings', () => {
  test('Ratings', () => {
    render(<Product />);
    expect(screen.getByText('ratings')).toBeInTheDocument()
  });
});


describe('Cart exists', () => {
  test('Finds the cart', () => {
    render(<Product />);
    expect(screen.getByRole('Cart')).toBeInTheDocument() ||  expect(screen.getByRole('Bag')).toBeInTheDocument()
  });
});

describe('Quantity selector works', () => {
  test('Quantity selector works', () => {
    render(<Product />);
    expect(screen.getByText('button')).toBeInTheDocument()
  });
});

// test('General Information displayed at top of Overview'), () => {
//   expect()
// }

