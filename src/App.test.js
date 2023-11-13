import test, { render, screen } from '@testing-library/react';
import App from './App';

test('renders Página inicial link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Página inicial/i)
  expect(linkElement).toBeInTheDocument()
})