import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import CopyButton from '../../../components/common/CopyButton';

// Mock the useCopyToClipboard hook
jest.mock('usehooks-ts', () => ({
  useCopyToClipboard: () => [null, jest.fn()],
}));

describe('CopyButton Component', () => {
  const mockDataSrc = jest.fn(() => 'test-data-to-copy');
  const mockTitle = 'Copy test data';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders copy button with title', () => {
    render(<CopyButton dataSrc={mockDataSrc} title={mockTitle} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', mockTitle);
  });

  it('displays copy icon initially', () => {
    render(<CopyButton dataSrc={mockDataSrc} title={mockTitle} />);

    const copyIcon = screen.getByRole('button').querySelector('svg');
    expect(copyIcon).not.toHaveClass('opacity-0');
  });

  it('calls dataSrc function and shows success state when clicked', async () => {
    render(<CopyButton dataSrc={mockDataSrc} title={mockTitle} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockDataSrc).toHaveBeenCalledTimes(1);

    // Check that the success icon becomes visible
    await waitFor(() => {
      const checkIcon = button.querySelector('svg[color="green"]');
      expect(checkIcon).not.toHaveClass('opacity-0');
    });
  });

  it('resets to initial state after timeout', async () => {
    jest.useFakeTimers();

    render(<CopyButton dataSrc={mockDataSrc} title={mockTitle} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Fast-forward time by 1500ms and run all timers
    jest.runAllTimers();

    await waitFor(() => {
      const copyIcon = button.querySelector('svg:not([color="green"])');
      expect(copyIcon).not.toHaveClass('opacity-0');
    });

    jest.useRealTimers();
  });

  it('applies correct CSS classes', () => {
    render(<CopyButton dataSrc={mockDataSrc} title={mockTitle} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('copy-button', 'relative', 'w-auto');
  });
});
