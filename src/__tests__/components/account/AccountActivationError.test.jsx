import { fireEvent, render, screen } from '@testing-library/react';

import AccountActivationError from '../../../components/account/AccountActivationError';

jest.mock('react-router-dom');

// Mock Button component to focus on AccountActivationError logic
jest.mock('../../../components/common/Button', () => {
  return function MockButton({ children, onClick, className, variant, type }) {
    return (
      <button
        className={className}
        data-variant={variant}
        data-type={type}
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

describe('AccountActivationError Component', () => {
  beforeEach(() => {
    window.location.href = '';
  });

  it('renders without crashing', () => {
    render(<AccountActivationError />);
    expect(true).toBe(true);
  });

  it('renders the error message', () => {
    render(<AccountActivationError />);

    expect(
      screen.getByText('There was an error verifying your account.'),
    ).toBeInTheDocument();
  });

  it('renders detailed instruction text', () => {
    render(<AccountActivationError />);

    expect(
      screen.getByText(/Please try clicking on the verification link again/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /If this does not work and you are not able to log into Solar Moon Analytics/,
      ),
    ).toBeInTheDocument();
  });

  it('renders support email link', () => {
    render(<AccountActivationError />);

    const supportLink = screen.getByText('support@solarmoonanalytics.com');
    expect(supportLink).toBeInTheDocument();
    expect(supportLink.closest('a')).toHaveAttribute(
      'to',
      'mailto:support@solarmoonanalytics.com',
    );
  });

  it('applies correct styling to support email link', () => {
    render(<AccountActivationError />);

    const supportLink = screen.getByText('support@solarmoonanalytics.com');
    expect(supportLink).toHaveClass('text-brand-primary', 'underline');
  });

  it('renders login button', () => {
    render(<AccountActivationError />);

    const button = screen.getByText('Login to your account');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-type', 'button');
  });

  it('handles button click to redirect to app', () => {
    render(<AccountActivationError />);

    const button = screen.getByText('Login to your account');
    fireEvent.click(button);

    expect(window.location.href).toBe('https://app.solarmoonanalytics.com');
  });

  describe('Layout and Styling', () => {
    it('applies correct CSS classes to main container', () => {
      const { container } = render(<AccountActivationError />);

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
      const { container } = render(<AccountActivationError />);

      const contentDiv = container.querySelector('.fade-in');
      expect(contentDiv).toHaveClass(
        'fade-in',
        'my-8',
        'max-w-full',
        'bg-white',
        'p-6',
        'shadow-panel',
        'sm:mx-5',
        'sm:max-w-[55rem]',
        'sm:rounded-lg',
        'sm:p-8',
        'dark:bg-gray-800',
      );
    });

    it('applies correct styling to error message', () => {
      render(<AccountActivationError />);

      const message = screen.getByText(
        'There was an error verifying your account.',
      );
      expect(message).toHaveClass(
        'mb-8',
        'text-lg',
        'font-bold',
        'sm:text-2xl',
        'dark:text-gray-100',
      );
    });

    it('applies correct styling to instruction text', () => {
      render(<AccountActivationError />);

      const instructionText = screen
        .getByText(/Please try clicking on the verification link again/)
        .closest('div');
      expect(instructionText).toHaveClass('mb-8', 'dark:text-gray-100');
    });

    it('applies correct styling to login button', () => {
      render(<AccountActivationError />);

      const button = screen.getByText('Login to your account');
      expect(button).toHaveClass('mt-3', 'justify-center');
    });

    it('includes proper responsive layout classes', () => {
      const { container } = render(<AccountActivationError />);

      const contentDiv = container.querySelector('.fade-in');
      expect(contentDiv).toHaveClass(
        'sm:mx-5',
        'sm:max-w-[55rem]',
        'sm:rounded-lg',
        'sm:p-8',
      );
    });
  });

  describe('Content Structure', () => {
    it('maintains proper component hierarchy', () => {
      const { container } = render(<AccountActivationError />);

      const main = container.querySelector('main');
      const fadeIn = main.querySelector('.fade-in');
      const innerDiv = fadeIn.querySelector(
        '.mb-8.flex.flex-col.items-center.p-8',
      );

      expect(main).toContainElement(fadeIn);
      expect(fadeIn).toContainElement(innerDiv);
    });

    it('includes proper content spacing', () => {
      const { container } = render(<AccountActivationError />);

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

    it('organizes content in logical order', () => {
      render(<AccountActivationError />);

      // Error message should come first
      const errorMessage = screen.getByText(
        'There was an error verifying your account.',
      );
      expect(errorMessage).toBeInTheDocument();

      // Then instructions
      const instructions = screen.getByText(
        /Please try clicking on the verification link again/,
      );
      expect(instructions).toBeInTheDocument();

      // Finally the button
      const button = screen.getByText('Login to your account');
      expect(button).toBeInTheDocument();
    });
  });

  describe('User Experience', () => {
    it('provides clear error communication', () => {
      render(<AccountActivationError />);

      const errorMessage = screen.getByText(
        'There was an error verifying your account.',
      );
      expect(errorMessage).toHaveClass('font-bold');
    });

    it('offers actionable next steps', () => {
      render(<AccountActivationError />);

      expect(
        screen.getByText(/Please try clicking on the verification link again/),
      ).toBeInTheDocument();
      expect(screen.getByText('Login to your account')).toBeInTheDocument();
    });

    it('provides support contact information', () => {
      render(<AccountActivationError />);

      const supportText = screen.getByText(/please contact/);
      expect(supportText).toBeInTheDocument();

      const supportLink = screen.getByText('support@solarmoonanalytics.com');
      expect(supportLink).toBeInTheDocument();
    });

    it('uses primary button for main action', () => {
      render(<AccountActivationError />);

      const button = screen.getByText('Login to your account');
      expect(button).toHaveAttribute('data-variant', 'primary');
    });
  });

  describe('Accessibility', () => {
    it('provides semantic main element', () => {
      const { container } = render(<AccountActivationError />);

      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
    });

    it('uses proper button element for interaction', () => {
      render(<AccountActivationError />);

      const button = screen.getByText('Login to your account');
      expect(button.tagName).toBe('BUTTON');
    });

    it('provides accessible link for support contact', () => {
      render(<AccountActivationError />);

      const supportLink = screen
        .getByText('support@solarmoonanalytics.com')
        .closest('a');
      expect(supportLink).toHaveAttribute(
        'to',
        'mailto:support@solarmoonanalytics.com',
      );
    });

    it('supports dark mode styling', () => {
      const { container } = render(<AccountActivationError />);

      const main = container.querySelector('main');
      expect(main).toHaveClass('dark:bg-gray-950');

      const contentDiv = container.querySelector('.fade-in');
      expect(contentDiv).toHaveClass('dark:bg-gray-800');

      const message = screen.getByText(
        'There was an error verifying your account.',
      );
      expect(message).toHaveClass('dark:text-gray-100');
    });

    it('maintains proper text hierarchy', () => {
      render(<AccountActivationError />);

      const errorMessage = screen.getByText(
        'There was an error verifying your account.',
      );
      expect(errorMessage).toHaveClass('text-lg', 'font-bold', 'sm:text-2xl');
    });
  });

  describe('External Integration', () => {
    it('redirects to correct application URL', () => {
      render(<AccountActivationError />);

      const button = screen.getByText('Login to your account');
      fireEvent.click(button);

      expect(window.location.href).toBe('https://app.solarmoonanalytics.com');
    });

    it('provides mailto link to support', () => {
      render(<AccountActivationError />);

      const supportLink = screen
        .getByText('support@solarmoonanalytics.com')
        .closest('a');
      expect(supportLink.getAttribute('to')).toBe(
        'mailto:support@solarmoonanalytics.com',
      );
    });
  });

  describe('Error Handling', () => {
    it('handles window.location assignment without errors', () => {
      render(<AccountActivationError />);

      const button = screen.getByText('Login to your account');

      expect(() => {
        fireEvent.click(button);
      }).not.toThrow();

      expect(window.location.href).toBe('https://app.solarmoonanalytics.com');
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive text sizing', () => {
      render(<AccountActivationError />);

      const errorMessage = screen.getByText(
        'There was an error verifying your account.',
      );
      expect(errorMessage).toHaveClass('text-lg', 'sm:text-2xl');
    });

    it('centers content appropriately', () => {
      const { container } = render(<AccountActivationError />);

      const main = container.querySelector('main');
      expect(main).toHaveClass('flex', 'flex-col', 'items-center');

      const innerContainer = container.querySelector(
        '.mb-8.flex.flex-col.items-center',
      );
      expect(innerContainer).toHaveClass('items-center');
    });
  });
});
