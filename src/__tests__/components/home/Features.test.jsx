import { render, screen } from '@testing-library/react';

import Features from '../../../components/home/Features';

// Mock FeatureCard component to simplify testing
jest.mock('../../../components/home/FeatureCard', () => {
  return function MockFeatureCard({ title, description, imgPath }) {
    return (
      <div data-testid="feature-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <img alt={title} src={imgPath} />
      </div>
    );
  };
});

describe('Features Component', () => {
  it('renders the main heading with logo', () => {
    render(<Features />);
    
    expect(screen.getByText('Solar Moon Analytics')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    
    const logoImg = screen.getByAltText('brand');
    expect(logoImg).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<Features />);
    
    const expectedFeatures = [
      'Aggregation',
      'Flexibility',
      'Live Data Browsing',
      'Historic Data Export',
      'Alerting',
      'Reporting',
    ];

    expectedFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    // Should render 6 feature cards
    const featureCards = screen.getAllByTestId('feature-card');
    expect(featureCards).toHaveLength(6);
  });

  it('renders feature descriptions', () => {
    render(<Features />);
    
    // Test a few key feature descriptions
    expect(screen.getByText(/multitude of devices seamlessly/i)).toBeInTheDocument();
    expect(screen.getByText(/tailored to meet your specific needs/i)).toBeInTheDocument();
    expect(screen.getByText(/live data from all your devices/i)).toBeInTheDocument();
    expect(screen.getByText(/timely alerts via email/i)).toBeInTheDocument();
  });

  it('applies correct CSS classes to main container', () => {
    const { container } = render(<Features />);
    
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('max-w-[75rem]', 'p-4', 'sm:p-12');
  });

  it('applies correct styling to header section', () => {
    const { container } = render(<Features />);
    
    const headerDiv = container.querySelector('.flex.flex-wrap.items-center');
    expect(headerDiv).toHaveClass(
      'flex',
      'flex-wrap',
      'items-center',
      'text-xl',
      'font-bold',
      'sm:flex-nowrap',
      'sm:text-4xl'
    );
  });

  it('renders feature cards in correct container', () => {
    const { container } = render(<Features />);
    
    const cardsContainer = container.querySelector('.my-8.flex.flex-wrap.justify-around');
    expect(cardsContainer).toBeInTheDocument();
    expect(cardsContainer).toHaveClass('my-8', 'flex', 'flex-wrap', 'justify-around', 'sm:my-12');
  });

  it('applies brand-primary styling to Features text', () => {
    render(<Features />);
    
    const featuresText = screen.getByText('Features');
    expect(featuresText).toHaveClass('whitespace-nowrap', 'text-brand-primary');
  });

  it('renders logo with correct styling', () => {
    render(<Features />);
    
    const logoImg = screen.getByAltText('brand');
    expect(logoImg).toHaveClass('object-fill');
  });
});