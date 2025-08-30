import { fireEvent, render, screen } from '@testing-library/react';

import Button from '../../../components/common/Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Button-primary');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant='secondary'>Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('Button-secondary');

    rerender(<Button variant='danger'>Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('Button-danger');

    rerender(<Button variant='outline-primary'>Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('Button-outline-primary');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-70', 'pointer-events-none');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className='custom-class'>Custom</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('passes through additional button props', () => {
    render(
      <Button buttonProps={{ 'data-testid': 'custom-button', type: 'submit' }}>
        Submit
      </Button>,
    );

    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('applies correct CSS classes for each variant', () => {
    const variants = [
      'primary',
      'secondary',
      'outline-primary',
      'outline-secondary',
      'outline-danger',
      'danger',
      'text',
      'icon',
    ];

    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(`Button-${variant}`);
      unmount();
    });
  });
});
