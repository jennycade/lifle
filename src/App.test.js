import { render, screen } from '@testing-library/react';
import App from './App';

xtest('renders Animle header', async () => {
  render(<App />);
  const header = await screen.findByText(/Animle/i);
  expect(header).toBeInTheDocument();
});
