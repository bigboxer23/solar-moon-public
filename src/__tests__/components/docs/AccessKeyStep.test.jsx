import { render, screen } from '@testing-library/react';

import AccessKeyStep from '../../../components/docs/AccessKeyStep';

jest.mock('react-router-dom');

describe('AccessKeyStep Component', () => {
  it('renders without crashing', () => {
    render(<AccessKeyStep />);
    expect(true).toBe(true);
  });

  it('renders the instruction text', () => {
    render(<AccessKeyStep />);

    expect(screen.getByText(/Navigate to the/)).toBeInTheDocument();
    expect(screen.getByText('user profile section')).toBeInTheDocument();
    expect(
      screen.getByText(
        /and locate the access key underneath the API Information section/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Copy this for usage later/)).toBeInTheDocument();
  });

  it('renders a link to the user profile section', () => {
    render(<AccessKeyStep />);

    const profileLink = screen.getByText('user profile section');
    expect(profileLink).toBeInTheDocument();
    expect(profileLink.closest('a')).toHaveAttribute(
      'to',
      'https://app.solarmoonanalytics.com/profile',
    );
  });

  it('applies correct styling to the profile link', () => {
    render(<AccessKeyStep />);

    const profileLink = screen.getByText('user profile section');
    expect(profileLink).toHaveClass('text-brand-primary', 'underline');
  });

  it('provides complete step instructions', () => {
    render(<AccessKeyStep />);

    // Check that all parts of the instruction are present
    const container = screen.getByText(/Navigate to the/).closest('div');
    expect(container).toHaveTextContent(
      'Navigate to the user profile section and locate the access key underneath the API Information section. Copy this for usage later.',
    );
  });

  describe('Accessibility', () => {
    it('provides accessible link to external resource', () => {
      render(<AccessKeyStep />);

      const profileLink = screen.getByText('user profile section').closest('a');
      expect(profileLink).toHaveAttribute(
        'to',
        'https://app.solarmoonanalytics.com/profile',
      );

      // Link should be clearly identifiable and actionable
      expect(profileLink).toHaveClass('underline');
    });

    it('maintains proper text flow and readability', () => {
      render(<AccessKeyStep />);

      const container = screen.getByText(/Navigate to the/).closest('div');

      // Should contain all instruction text in a single readable flow
      expect(container).toHaveTextContent(
        /Navigate to the.*user profile section.*API Information section.*Copy this for usage later/,
      );
    });
  });

  describe('Content Structure', () => {
    it('renders as a single div container', () => {
      const { container } = render(<AccessKeyStep />);

      const rootDiv = container.firstChild;
      expect(rootDiv.tagName).toBe('DIV');
    });

    it('includes non-breaking space for proper text spacing', () => {
      render(<AccessKeyStep />);

      // The component should handle text spacing properly around the link
      const container = screen.getByText(/Navigate to the/).closest('div');
      expect(container.innerHTML).toContain('&nbsp;');
    });
  });
});
