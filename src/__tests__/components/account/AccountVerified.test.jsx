import { fireEvent, render, screen } from '@testing-library/react';

import AccountVerified from '../../../components/account/AccountVerified';

// Mock Button component to focus on AccountVerified logic
jest.mock('../../../components/common/Button', () => {
  return function MockButton({ children, onClick, className, variant }) {
    return (
      <button 
        className={className} 
        data-variant={variant}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
});

// Mock window.location.href
delete window.location;
window.location = { href: '' };

describe('AccountVerified Component', () => {
  beforeEach(() => {
    window.location.href = '';
  });

  it('renders the success message', () => {
    render(<AccountVerified />);
    
    expect(screen.getByText('Account verification successful!')).toBeInTheDocument();
  });

  it('renders login button', () => {
    render(<AccountVerified />);
    
    const button = screen.getByText('Login to your account');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('handles button click to redirect to app', () => {
    render(<AccountVerified />);
    
    const button = screen.getByText('Login to your account');
    fireEvent.click(button);
    
    expect(window.location.href).toBe('https://app.solarmoonanalytics.com');
  });

  it('applies correct CSS classes to main container', () => {
    const { container } = render(<AccountVerified />);
    
    const main = container.querySelector('main');
    expect(main).toHaveClass(
      'tos',
      'flex',
      'flex-col',
      'items-center',
      'bg-brand-primary-light',
      'dark:bg-gray-950'
    );
  });

  it('applies correct styling to content container', () => {
    const { container } = render(<AccountVerified />);
    
    const contentDiv = container.querySelector('.fade-in');
    expect(contentDiv).toHaveClass(
      'fade-in',
      'my-8',
      'max-w-full',
      'bg-white',
      'p-6',
      'shadow-panel',
      'dark:bg-gray-800'
    );
  });

  it('applies correct styling to success message', () => {
    render(<AccountVerified />);
    
    const message = screen.getByText('Account verification successful!');
    expect(message).toHaveClass(
      'mb-8',
      'text-lg',
      'font-bold',
      'sm:text-2xl',
      'dark:text-gray-100'
    );
  });

  it('applies correct styling to button', () => {
    render(<AccountVerified />);
    
    const button = screen.getByText('Login to your account');
    expect(button).toHaveClass('mt-3', 'justify-center');
  });
});