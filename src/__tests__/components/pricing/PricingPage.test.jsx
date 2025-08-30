import { fireEvent, render, screen } from '@testing-library/react';

import PricingPage from '../../../components/pricing/PricingPage';

// Mock PriceTile component to focus on PricingPage logic
jest.mock('../../../components/pricing/PriceTile', () => {
  return function MockPriceTile({ label, price, checkoutClicked }) {
    return (
      <div data-testid={`price-tile-${label.toLowerCase()}`}>
        <h3>{label}</h3>
        <span>${price}</span>
        <button onClick={() => checkoutClicked()}>
          Choose {label} Plan
        </button>
      </div>
    );
  };
});

// Mock window.location.href
delete window.location;
window.location = { href: '' };

describe('PricingPage Component', () => {
  beforeEach(() => {
    window.location.href = '';
  });

  it('renders the main heading', () => {
    render(<PricingPage />);
    
    expect(screen.getByText('Choose a')).toBeInTheDocument();
    expect(screen.getByText('Plan')).toBeInTheDocument();
  });

  it('renders both pricing tiles', () => {
    render(<PricingPage />);
    
    expect(screen.getByTestId('price-tile-monthly')).toBeInTheDocument();
    expect(screen.getByTestId('price-tile-yearly')).toBeInTheDocument();
  });

  it('displays plan features', () => {
    render(<PricingPage />);
    
    expect(screen.getByText('Plans include')).toBeInTheDocument();
    
    const features = [
      'Up to 20 devices per seat',
      'Site level data via virtual devices',
      'Live data reporting',
      'Historic data export',
      'Device alerting via email',
      'Periodic account digest',
    ];

    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('applies correct CSS classes to main container', () => {
    const { container } = render(<PricingPage />);
    
    const main = container.querySelector('main');
    expect(main).toHaveClass(
      'pricing-page',
      'mx-2',
      'flex',
      'min-h-[83vh]',
      'flex-col',
      'items-center',
      'bg-brand-primary-light',
      'dark:bg-gray-950'
    );
  });

  it('applies brand-primary styling to Plan text', () => {
    render(<PricingPage />);
    
    const planText = screen.getByText('Plan');
    expect(planText).toHaveClass('text-brand-primary');
  });

  it('handles checkout button click', () => {
    render(<PricingPage />);
    
    const monthlyButton = screen.getByText('Choose Monthly Plan');
    fireEvent.click(monthlyButton);
    
    expect(window.location.href).toBe('https://app.solarmoonanalytics.com');
  });

  it('renders features list with correct styling', () => {
    const { container } = render(<PricingPage />);
    
    const featuresList = container.querySelector('ul.list-disc');
    expect(featuresList).toBeInTheDocument();
    expect(featuresList).toHaveClass('list-disc', 'dark:text-neutral-300');
  });

  it('renders plans include section with correct styling', () => {
    render(<PricingPage />);
    
    const plansIncludeTitle = screen.getByText('Plans include');
    expect(plansIncludeTitle).toHaveClass(
      'align-self-start',
      'mb-4',
      'text-lg',
      'font-extrabold',
      'text-brand-primary'
    );
  });
});