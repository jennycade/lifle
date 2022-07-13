import Modal from './Modal';
import { render, screen, } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

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

  it('Closes when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <div>Hello</div>
        <div>Goodbye</div>
      </Modal>
    );
    const hello = await screen.findByText(/hello/i);
    const goodbye = await screen.findByText(/goodbye/i);

    const close = await screen.findByRole('button', {name: /close/i});

    await user.click(close);

    expect(hello).not.toBeInTheDocument();
    expect(goodbye).not.toBeInTheDocument();

  });
});

