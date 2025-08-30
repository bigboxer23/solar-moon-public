import { fireEvent, render, screen } from '@testing-library/react';

import PriceTile from '../../../components/pricing/PriceTile';

describe('PriceTile Component', () => {
  const mockProps = {
    label: 'Basic Plan',
    label2: 'month',
    label3: '(Most Popular)',
    count: 1,
    setCount: jest.fn(),
    priceId: 'price_basic_monthly',
    price: 25,
    checkoutClicked: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all pricing information correctly', () => {
    render(<PriceTile {...mockProps} />);

    expect(screen.getByText(mockProps.label)).toBeInTheDocument();
    expect(screen.getByText(mockProps.label3)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProps.price}`)).toBeInTheDocument();
    expect(
      screen.getByText(`per seat per ${mockProps.label2}`),
    ).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('devices per seat')).toBeInTheDocument();
  });

  it('renders choose plan button', () => {
    render(<PriceTile {...mockProps} />);

    const button = screen.getByRole('button', { name: /choose plan/i });
    expect(button).toBeInTheDocument();
  });

  it('calls checkoutClicked with correct parameters when button is clicked', () => {
    render(<PriceTile {...mockProps} />);

    const button = screen.getByRole('button', { name: /choose plan/i });
    fireEvent.click(button);

    expect(mockProps.checkoutClicked).toHaveBeenCalledWith(
      mockProps.priceId,
      mockProps.count,
    );
  });

  it('applies correct styling classes', () => {
    const { container } = render(<PriceTile {...mockProps} />);

    const priceCard = container.firstChild;
    expect(priceCard).toHaveClass('price', 'fade-in', 'grow-1');
    expect(priceCard).toHaveClass('m-3', 'mx-2', 'my-8', 'flex');
    expect(priceCard).toHaveClass(
      'rounded-lg',
      'bg-white',
      'p-8',
      'shadow-panel',
    );
  });

  it('displays pricing with different label2 values', () => {
    const yearlyProps = { ...mockProps, label2: 'year', price: 250 };
    render(<PriceTile {...yearlyProps} />);

    expect(screen.getByText('per seat per year')).toBeInTheDocument();
    expect(screen.getByText('$250')).toBeInTheDocument();
  });

  it('handles missing label3 gracefully', () => {
    const propsWithoutLabel3 = { ...mockProps, label3: undefined };
    render(<PriceTile {...propsWithoutLabel3} />);

    expect(screen.getByText(mockProps.label)).toBeInTheDocument();
    // Should not crash and should still render other content
    expect(screen.getByText(`$${mockProps.price}`)).toBeInTheDocument();
  });
});
