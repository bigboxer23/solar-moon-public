import { render, screen } from '@testing-library/react';

import GettingStarted from '../../../components/docs/GettingStarted';

jest.mock('react-router-dom');

// Mock child components
jest.mock('../../../components/docs/AccessKeyStep', () => {
  return function MockAccessKeyStep() {
    return <div data-testid='access-key-step'>Access Key Step Content</div>;
  };
});

jest.mock('../../../components/docs/Step', () => {
  return function MockStep({ number, title, content }) {
    return (
      <div data-number={number} data-testid='step' data-title={title}>
        <span>
          Step {number}: {title}
        </span>
        <div>{content}</div>
      </div>
    );
  };
});

describe('GettingStarted Component', () => {
  it('renders without crashing', () => {
    render(<GettingStarted />);
    expect(true).toBe(true);
  });

  it('renders the main heading', () => {
    render(<GettingStarted />);

    expect(screen.getByText('Getting')).toBeInTheDocument();
    expect(screen.getByText('Started')).toBeInTheDocument();
  });

  it('applies correct styling to the main heading', () => {
    render(<GettingStarted />);

    const headingContainer = screen.getByText('Getting').closest('div');
    expect(headingContainer).toHaveClass(
      'mb-8',
      'flex',
      'text-2xl',
      'font-bold',
      'sm:text-4xl',
    );

    const startedSpan = screen.getByText('Started');
    expect(startedSpan).toHaveClass('text-brand-primary');
  });

  it('renders all step components', () => {
    render(<GettingStarted />);

    const steps = screen.getAllByTestId('step');
    expect(steps).toHaveLength(5);
  });

  describe('Step Content', () => {
    it('renders Step 1: Create an account', () => {
      render(<GettingStarted />);

      const step1 = screen.getByText('Step 1: Create an account');
      expect(step1).toBeInTheDocument();

      const createAccountLink = screen.getByText('Create Account');
      expect(createAccountLink.closest('a')).toHaveAttribute(
        'to',
        'https://app.solarmoonanalytics.com',
      );
      expect(createAccountLink).toHaveClass('text-brand-primary', 'underline');
    });

    it('renders Step 2: Verify your email address', () => {
      render(<GettingStarted />);

      expect(
        screen.getByText('Step 2: Verify your email address'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Check your email box for a verification code and paste this into the window from the previous step.',
        ),
      ).toBeInTheDocument();
    });

    it('renders Step 3: Sign up for a plan', () => {
      render(<GettingStarted />);

      expect(
        screen.getByText('Step 3: Sign up for a plan'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Plans are available monthly or annually in packs of 20 devices/,
        ),
      ).toBeInTheDocument();

      const seeHereLink = screen.getByText('see here');
      expect(seeHereLink.closest('a')).toHaveAttribute(
        'to',
        'https://solarmoonanalytics.com/pricing',
      );
      expect(seeHereLink).toHaveClass('text-brand-primary', 'underline');
    });

    it('renders Step 4: Collect your access key', () => {
      render(<GettingStarted />);

      expect(
        screen.getByText('Step 4: Collect your access key'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('access-key-step')).toBeInTheDocument();
    });

    it('renders Step 5: Setup devices', () => {
      render(<GettingStarted />);

      expect(screen.getByText('Step 5: Setup devices')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Follow instructions below depending on the type of devices',
        ),
      ).toBeInTheDocument();

      const obviusLink = screen.getByText('Connecting an Obvius device');
      expect(obviusLink.closest('a')).toHaveAttribute(
        'to',
        '/docs/connectingDevice',
      );
      expect(obviusLink).toHaveClass('text-brand-primary', 'underline');

      const smaLink = screen.getByText('Connecting SMA devices');
      expect(smaLink.closest('a')).toHaveAttribute(
        'to',
        '/docs/connectingSMADevices',
      );
      expect(smaLink).toHaveClass('text-brand-primary', 'underline');
    });
  });

  describe('Structure and Layout', () => {
    it('renders step list with proper structure', () => {
      render(<GettingStarted />);

      // Check that Step 5 contains a proper list structure
      const step5Content = screen
        .getByText('Follow instructions below depending on the type of devices')
        .closest('div');

      // Should contain a break and unordered list
      expect(step5Content.innerHTML).toContain('<br>');
      expect(step5Content.querySelector('ul')).toHaveClass('ms-6', 'list-disc');
    });

    it('applies correct styling to Step 5 list items', () => {
      render(<GettingStarted />);

      const step5Content = screen
        .getByText('Follow instructions below depending on the type of devices')
        .closest('div');
      const listItems = step5Content.querySelectorAll('li');

      expect(listItems).toHaveLength(2);
    });

    it('maintains proper component hierarchy', () => {
      const { container } = render(<GettingStarted />);

      // Should have a main div container
      const mainDiv = container.firstChild;
      expect(mainDiv.tagName).toBe('DIV');

      // Should contain heading and steps container
      const headingDiv = mainDiv.querySelector('.mb-8.flex.text-2xl');
      expect(headingDiv).toBeInTheDocument();

      const stepsContainer = mainDiv.querySelector('div:nth-child(2)');
      expect(stepsContainer).toBeInTheDocument();
    });
  });

  describe('External Links', () => {
    it('includes links to external Solar Moon Analytics resources', () => {
      render(<GettingStarted />);

      // App link
      const appLink = screen.getByText('Create Account').closest('a');
      expect(appLink).toHaveAttribute(
        'to',
        'https://app.solarmoonanalytics.com',
      );

      // Pricing link
      const pricingLink = screen.getByText('see here').closest('a');
      expect(pricingLink).toHaveAttribute(
        'to',
        'https://solarmoonanalytics.com/pricing',
      );
    });

    it('includes internal navigation links', () => {
      render(<GettingStarted />);

      const obviusLink = screen
        .getByText('Connecting an Obvius device')
        .closest('a');
      expect(obviusLink).toHaveAttribute('to', '/docs/connectingDevice');

      const smaLink = screen.getByText('Connecting SMA devices').closest('a');
      expect(smaLink).toHaveAttribute('to', '/docs/connectingSMADevices');
    });
  });

  describe('Accessibility', () => {
    it('provides proper heading structure', () => {
      render(<GettingStarted />);

      const heading = screen.getByText('Getting').closest('div');
      expect(heading).toHaveClass('text-2xl', 'font-bold', 'sm:text-4xl');
    });

    it('maintains semantic list structure for device setup options', () => {
      render(<GettingStarted />);

      const step5Content = screen
        .getByText('Follow instructions below depending on the type of devices')
        .closest('div');
      const list = step5Content.querySelector('ul');

      expect(list).toHaveClass('list-disc');
      expect(list.querySelectorAll('li')).toHaveLength(2);
    });

    it('provides clear link styling for external resources', () => {
      render(<GettingStarted />);

      const links = [
        screen.getByText('Create Account'),
        screen.getByText('see here'),
        screen.getByText('Connecting an Obvius device'),
        screen.getByText('Connecting SMA devices'),
      ];

      links.forEach((link) => {
        expect(link).toHaveClass('text-brand-primary', 'underline');
      });
    });
  });
});
