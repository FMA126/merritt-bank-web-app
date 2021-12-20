import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders message when not connected to Metamask', () => {
  render(<App />);
  const divElement = screen.getByText(/connect/i);
  expect(divElement).toBeInTheDocument();
});
