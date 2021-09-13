import React from 'react';
import { render, screen } from '../../test-utils.jsx';
import RelatedContainer from './RelatedContainer.jsx';

describe('RelatedContainer', () => {
  test('renders Related Container component', () => {
    render(<RelatedContainer />);
  });

  test('displays two sets of related products', () => {
    render(<RelatedContainer />);

    expect(screen.getByTestId('outfitProductsContainer')).toBeInDocument();
    expect(screen.getByTestId('relatedProductsContainer')).toBeInDocument();
  });
});
