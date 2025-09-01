import { fireEvent, render, screen } from '@testing-library/react';

import AccountVerified from '../../../components/account/AccountVerified';

// Mock Button component to focus on AccountVerified logic
jest.mock('../../../components/common/Button', () => {
  return function MockButton({ children, onClick, className, variant }) {
    return (
      <button className={className} data-variant={variant} onClick={onClick}>
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

    expect(
      screen.getByText('Account verification successful!'),
    ).toBeInTheDocument();
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
      'dark:bg-gray-950',
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
      'dark:bg-gray-800',
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
      'dark:text-gray-100',
    );
  });

  it('applies correct styling to button', () => {
    render(<AccountVerified />);

    const button = screen.getByText('Login to your account');
    expect(button).toHaveClass('mt-3', 'justify-center');
  });

  describe('Layout Structure', () => {
    it('maintains proper component hierarchy', () => {
      const { container } = render(<AccountVerified />);

      const main = container.querySelector('main');
      const fadeIn = main.querySelector('.fade-in');
      const innerDiv = fadeIn.querySelector(
        '.mb-8.flex.flex-col.items-center.p-8',
      );

      expect(main).toContainElement(fadeIn);
      expect(fadeIn).toContainElement(innerDiv);
    });

    it('applies responsive layout classes', () => {
      const { container } = render(<AccountVerified />);

      const contentDiv = container.querySelector('.fade-in');
      expect(contentDiv).toHaveClass(
        'sm:mx-5',
        'sm:max-w-[55rem]',
        'sm:rounded-lg',
        'sm:p-8',
      );
    });

    it('includes proper content spacing', () => {
      const { container } = render(<AccountVerified />);

      const innerContainer = container.querySelector(
        '.mb-8.flex.flex-col.items-center.p-8',
      );
      expect(innerContainer).toHaveClass(
        'mb-8',
        'flex',
        'flex-col',
        'items-center',
        'p-8',
      );
    });
  });

  describe('User Interaction', () => {
    it('provides clear call-to-action', () => {
      render(<AccountVerified />);

      const message = screen.getByText('Account verification successful!');
      const button = screen.getByText('Login to your account');

      expect(message).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('redirects to correct application URL', () => {
      render(<AccountVerified />);

      const button = screen.getByText('Login to your account');
      fireEvent.click(button);

      expect(window.location.href).toBe('https://app.solarmoonanalytics.com');
    });

    it('uses primary button variant for emphasis', () => {
      render(<AccountVerified />);

      const button = screen.getByText('Login to your account');
      expect(button).toHaveAttribute('data-variant', 'primary');
    });
  });

  describe('Accessibility', () => {
    it('provides semantic main element', () => {
      const { container } = render(<AccountVerified />);

      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
    });

    it('uses proper button element for interaction', () => {
      render(<AccountVerified />);

      const button = screen.getByText('Login to your account');
      expect(button.tagName).toBe('BUTTON');
    });

    it('provides clear feedback message', () => {
      render(<AccountVerified />);

      const message = screen.getByText('Account verification successful!');
      expect(message).toHaveClass('font-bold');
    });

    it('supports dark mode styling', () => {
      const { container } = render(<AccountVerified />);

      const main = container.querySelector('main');
      expect(main).toHaveClass('dark:bg-gray-950');

      const contentDiv = container.querySelector('.fade-in');
      expect(contentDiv).toHaveClass('dark:bg-gray-800');

      const message = screen.getByText('Account verification successful!');
      expect(message).toHaveClass('dark:text-gray-100');
    });
  });

  describe('Content Presentation', () => {
    it('centers all content appropriately', () => {
      const { container } = render(<AccountVerified />);

      const main = container.querySelector('main');
      expect(main).toHaveClass('flex', 'flex-col', 'items-center');

      const innerContainer = container.querySelector(
        '.mb-8.flex.flex-col.items-center',
      );
      expect(innerContainer).toHaveClass('items-center');
    });

    it('applies proper text sizing for different screen sizes', () => {
      render(<AccountVerified />);

      const message = screen.getByText('Account verification successful!');
      expect(message).toHaveClass('text-lg', 'sm:text-2xl');
    });

    it('maintains consistent visual hierarchy', () => {
      render(<AccountVerified />);

      const message = screen.getByText('Account verification successful!');
      const button = screen.getByText('Login to your account');

      // Message should be prominent
      expect(message).toHaveClass('font-bold', 'text-lg', 'sm:text-2xl');

      // Button should be well-positioned
      expect(button).toHaveClass('mt-3', 'justify-center');
    });
  });

  describe('Error Handling', () => {
    it('handles window.location assignment without errors', () => {
      render(<AccountVerified />);

      const button = screen.getByText('Login to your account');

      expect(() => {
        fireEvent.click(button);
      }).not.toThrow();

      expect(window.location.href).toBe('https://app.solarmoonanalytics.com');
    });
  });
});
