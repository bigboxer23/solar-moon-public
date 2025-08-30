import { render, screen } from '@testing-library/react';

import Home from '../../../components/home/Home';

// Mock child components to focus on Home component logic
jest.mock('../../../components/home/Features', () => {
  return function MockFeatures() {
    return <div data-testid="features">Features Component</div>;
  };
});

jest.mock('../../../components/home/Type', () => {
  return function MockType() {
    return <div data-testid="type">Type Component</div>;
  };
});

jest.mock('react-parallax-tilt', () => {
  return function MockTilt({ children }) {
    return <div data-testid="tilt">{children}</div>;
  };
});

describe('Home Component', () => {
  it('renders the main welcome message', () => {
    render(<Home />);
    
    expect(screen.getByText('Welcome to')).toBeInTheDocument();
    expect(screen.getByText('Solar Moon Analytics!')).toBeInTheDocument();
  });

  it('renders the platform description', () => {
    render(<Home />);
    
    expect(screen.getByText(/Our platform empowers businesses/i)).toBeInTheDocument();
    expect(screen.getByText(/seamlessly oversee their solar energy infrastructure/i)).toBeInTheDocument();
  });

  it('renders child components', () => {
    render(<Home />);
    
    expect(screen.getByTestId('type')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
  });

  it('renders home logo with Tilt effect', () => {
    render(<Home />);
    
    expect(screen.getByTestId('tilt')).toBeInTheDocument();
    expect(screen.getByAltText('home pic')).toBeInTheDocument();
  });

  it('applies correct CSS classes to main container', () => {
    const { container } = render(<Home />);
    
    const main = container.querySelector('main');
    expect(main).toHaveClass(
      'home',
      'flex',
      'w-full',
      'flex-col',
      'items-center',
      'bg-brand-primary-light',
      'dark:bg-gray-950'
    );
  });

  it('applies brand-primary styling to company name', () => {
    render(<Home />);
    
    const companyName = screen.getByText('Solar Moon Analytics!');
    expect(companyName).toHaveClass('whitespace-nowrap', 'text-brand-primary');
  });

  it('renders logo with correct styling', () => {
    render(<Home />);
    
    const logo = screen.getByAltText('home pic');
    expect(logo).toHaveClass('object-fill');
  });

  it('applies responsive styling to image container', () => {
    const { container } = render(<Home />);
    
    const imageContainer = container.querySelector('.hidden.w-80.sm\\:flex');
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveClass('hidden', 'w-80', 'sm:flex');
  });

  it('applies correct layout styling to content sections', () => {
    const { container } = render(<Home />);
    
    const textSection = container.querySelector('.flex.w-full.min-w-80.flex-col');
    expect(textSection).toHaveClass('flex', 'w-full', 'min-w-80', 'flex-col', 'p-4');
  });
});