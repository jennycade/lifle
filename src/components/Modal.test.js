import Modal from './Modal';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Modal component', () => {
  it('renders children', async () => {
    render(
      <Modal>
        <div>Hello</div>
        <div>Goodbye</div>
      </Modal>
    );
    const hello = await screen.findByText(/hello/i);
    const goodbye = await screen.findByText(/goodbye/i);
    
    expect(hello).toBeInTheDocument();
    expect(goodbye).toBeInTheDocument();
  });

  it('Calls close function when close button is clicked', async () => {
    const closeFunction = jest.fn();
    render(
      <Modal onClose={closeFunction}></Modal>
    );

    const close = screen.getByRole('button', {name: /close/i});

    userEvent.click(close);

    expect(closeFunction).toBeCalled();

  });
});

