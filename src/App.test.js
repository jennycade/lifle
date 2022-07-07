import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Animle header', () => {
  render(<App />);
  const header = screen.getByText(/Animle/i);
  expect(header).toBeInTheDocument();
});
