import { render, screen } from '@testing-library/react';

import PrivacyPolicy from '../../../components/tos/PrivacyPolicy';

describe('PrivacyPolicy Component', () => {
  it('renders the main heading', () => {
    render(<PrivacyPolicy />);

    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('displays the last updated date', () => {
    render(<PrivacyPolicy />);

    expect(screen.getByText('LAST UPDATED: Jan 10, 2024')).toBeInTheDocument();
  });

  it('applies correct CSS classes to main container', () => {
    const { container } = render(<PrivacyPolicy />);

    const main = container.querySelector('main');
    expect(main).toHaveClass(
      'privacy',
      'flex',
      'flex-col',
      'items-center',
      'bg-brand-primary-light',
      'dark:bg-gray-950',
    );
  });

  it('applies correct styling to content container', () => {
    const { container } = render(<PrivacyPolicy />);

    const contentDiv = container.querySelector('.fade-in');
    expect(contentDiv).toHaveClass(
      'fade-in',
      'mx-2',
      'my-8',
      'max-w-[55rem]',
      'bg-white',
      'p-6',
      'shadow-panel',
      'dark:bg-gray-800',
    );
  });

  it('renders main heading with correct styling', () => {
    render(<PrivacyPolicy />);

    const heading = screen.getByText('Privacy Policy');
    expect(heading).toHaveClass('text-4xl', 'font-bold');
  });

  it('renders last updated text with correct styling', () => {
    render(<PrivacyPolicy />);

    const lastUpdated = screen.getByText('LAST UPDATED: Jan 10, 2024');
    expect(lastUpdated).toHaveClass('text-sm', 'text-neutral-500');
  });
});
