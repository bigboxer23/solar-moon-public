import { render, screen } from '@testing-library/react';

import Footer from '../../components/Footer';

jest.mock('react-router-dom');

// Mock react-icons
jest.mock('react-icons/md', () => ({
  MdOutlineEmail: () => <span data-testid='email-icon'>Email Icon</span>,
}));

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(true).toBe(true);
  });

  it('applies correct CSS classes to main container', () => {
    const { container } = render(<Footer />);

    const footerDiv = container.querySelector('.Footer');
    expect(footerDiv).toBeInTheDocument();
    expect(footerDiv).toHaveClass(
      'Footer',
      'flex',
      'justify-center',
      'bg-brand-primary-light',
      'px-4',
      'pb-4',
      'dark:bg-gray-950',
      'dark:text-gray-100',
    );
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();

    expect(
      screen.getByText(`© ${currentYear} Solar Moon Analytics, LLC`),
    ).toBeInTheDocument();
  });

  it('renders email contact information with icon', () => {
    render(<Footer />);

    expect(screen.getByTestId('email-icon')).toBeInTheDocument();
    expect(screen.getByTestId('link')).toHaveAttribute(
      'to',
      'mailto:info@solarmoonanalytics.com',
    );
    expect(screen.getByText('info@solarmoonanalytics.com')).toBeInTheDocument();
  });

  it('renders company section', () => {
    render(<Footer />);

    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Roadmap')).toBeInTheDocument();
    expect(screen.getByText('Changelog')).toBeInTheDocument();
  });

  it('renders legal section with navigation links', () => {
    render(<Footer />);

    expect(screen.getByText('Legal')).toBeInTheDocument();

    const tosLink = screen.getByText('Terms of Service');
    expect(tosLink).toBeInTheDocument();
    expect(tosLink.closest('a')).toHaveAttribute('to', '/tos');

    const privacyLink = screen.getByText('Privacy Policy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute('to', '/privacy');
  });

  describe('Layout Structure', () => {
    it('maintains proper responsive layout structure', () => {
      const { container } = render(<Footer />);

      const mainContainer = container.querySelector(
        '.flex.w-\\[55rem\\].flex-col.sm\\:flex-row',
      );
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass(
        'flex',
        'w-[55rem]',
        'flex-col',
        'sm:flex-row',
      );
    });

    it('renders contact section with proper styling', () => {
      const { container } = render(<Footer />);

      const contactSection = container.querySelector(
        '.flex.flex-col.justify-end.pb-4',
      );
      expect(contactSection).toBeInTheDocument();
      expect(contactSection).toHaveClass(
        'flex',
        'flex-col',
        'justify-end',
        'pb-4',
      );
    });

    it('includes spacer element for layout', () => {
      const { container } = render(<Footer />);

      const spacer = container.querySelector('.grow');
      expect(spacer).toBeInTheDocument();
      expect(spacer).toHaveClass('grow');
    });

    it('renders company section with correct styling', () => {
      const { container } = render(<Footer />);

      const companySection = container.querySelector('.me-5.pb-4');
      expect(companySection).toBeInTheDocument();
      expect(companySection).toHaveClass('me-5', 'pb-4');
    });

    it('renders legal section with proper flex styling', () => {
      const { container } = render(<Footer />);

      const legalSection = container.querySelector('.me-4.flex.flex-col');
      expect(legalSection).toBeInTheDocument();
      expect(legalSection).toHaveClass('me-4', 'flex', 'flex-col');
    });
  });

  describe('Content Styling', () => {
    it('applies correct styling to company subsection items', () => {
      render(<Footer />);

      const roadmap = screen.getByText('Roadmap');
      expect(roadmap).toHaveClass('text-sm', 'text-neutral-500');

      const changelog = screen.getByText('Changelog');
      expect(changelog).toHaveClass('text-sm', 'text-neutral-500');
    });

    it('applies correct styling to legal navigation links', () => {
      render(<Footer />);

      const tosLink = screen.getByText('Terms of Service');
      expect(tosLink).toHaveClass('text-sm', 'text-neutral-500', 'underline');

      const privacyLink = screen.getByText('Privacy Policy');
      expect(privacyLink).toHaveClass(
        'text-sm',
        'text-neutral-500',
        'underline',
      );
    });

    it('applies icon styling to email icon', () => {
      const { container } = render(<Footer />);

      const emailContainer = container.querySelector('.flex.items-center');
      expect(emailContainer).toBeInTheDocument();
      expect(screen.getByTestId('email-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides proper semantic structure', () => {
      render(<Footer />);

      // Email link should be accessible
      const emailLink = screen.getByTestId('link');
      expect(emailLink).toHaveAttribute(
        'to',
        'mailto:info@solarmoonanalytics.com',
      );

      // Navigation links should be accessible
      const tosLink = screen.getByText('Terms of Service');
      expect(tosLink.closest('a')).toHaveAttribute('to', '/tos');

      const privacyLink = screen.getByText('Privacy Policy');
      expect(privacyLink.closest('a')).toHaveAttribute('to', '/privacy');
    });

    it('maintains proper heading hierarchy', () => {
      render(<Footer />);

      // Section headers should be present
      expect(screen.getByText('Company')).toBeInTheDocument();
      expect(screen.getByText('Legal')).toBeInTheDocument();
    });
  });

  describe('Dynamic Content', () => {
    it('updates copyright year dynamically', () => {
      // Mock Date to test year calculation
      const mockDate = new Date('2025-06-15');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
      jest.spyOn(mockDate, 'getFullYear').mockReturnValue(2025);

      render(<Footer />);

      expect(
        screen.getByText('© 2025 Solar Moon Analytics, LLC'),
      ).toBeInTheDocument();

      // Restore Date mock
      global.Date.mockRestore();
    });

    it('handles different years correctly', () => {
      // Test with a different year
      const mockDate = new Date('2030-12-31');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
      jest.spyOn(mockDate, 'getFullYear').mockReturnValue(2030);

      render(<Footer />);

      expect(
        screen.getByText('© 2030 Solar Moon Analytics, LLC'),
      ).toBeInTheDocument();

      global.Date.mockRestore();
    });
  });
});
