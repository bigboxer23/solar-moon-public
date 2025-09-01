import { render, screen } from '@testing-library/react';

import ConnectingDevice from '../../../components/docs/ConnectingDevice';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to, className }) => (
    <a className={className} href={to}>
      {children}
    </a>
  ),
}));

// Mock CopyButton component
jest.mock('../../../components/common/CopyButton', () => {
  return function MockCopyButton({ dataSrc, title }) {
    return (
      <button data-datasrc={dataSrc()} data-testid='copy-button' title={title}>
        Copy
      </button>
    );
  };
});

// Mock AccessKeyStep component
jest.mock('../../../components/docs/AccessKeyStep', () => {
  return function MockAccessKeyStep() {
    return <div data-testid='access-key-step'>Access Key Step Content</div>;
  };
});

// Mock Step component
jest.mock('../../../components/docs/Step', () => {
  return function MockStep({ number, title, content }) {
    return (
      <div data-testid={`step-${number}`} data-title={title}>
        <div data-testid={`step-${number}-title`}>{title}</div>
        <div data-testid={`step-${number}-content`}>{content}</div>
      </div>
    );
  };
});

// Mock the upload channel image
jest.mock(
  '../../../assets/upload-channel.jpg',
  () => 'mock-upload-channel.jpg',
);

describe('ConnectingDevice Component', () => {
  it('renders without crashing', () => {
    render(<ConnectingDevice />);
    expect(true).toBe(true);
  });

  it('renders the main heading', () => {
    render(<ConnectingDevice />);

    expect(screen.getByText('Connecting an Obvius')).toBeInTheDocument();
    expect(screen.getByText('device')).toBeInTheDocument();
  });

  it('applies correct CSS classes to main heading', () => {
    const { container } = render(<ConnectingDevice />);

    const heading = container.querySelector(
      '.mb-8.flex.text-2xl.font-bold.sm\\:text-4xl',
    );
    expect(heading).toBeInTheDocument();
  });

  it('applies brand styling to "device" text in heading', () => {
    render(<ConnectingDevice />);

    const deviceSpan = screen.getByText('device');
    expect(deviceSpan).toHaveClass('text-brand-primary');
  });

  describe('Step Components', () => {
    it('renders all five steps', () => {
      render(<ConnectingDevice />);

      expect(screen.getByTestId('step-1')).toBeInTheDocument();
      expect(screen.getByTestId('step-2')).toBeInTheDocument();
      expect(screen.getByTestId('step-3')).toBeInTheDocument();
      expect(screen.getByTestId('step-4')).toBeInTheDocument();
      expect(screen.getByTestId('step-5')).toBeInTheDocument();
    });

    it('renders step 1 with correct title and AccessKeyStep content', () => {
      render(<ConnectingDevice />);

      const step1 = screen.getByTestId('step-1');
      expect(step1).toHaveAttribute('data-title', 'Collect access key');
      expect(screen.getByTestId('access-key-step')).toBeInTheDocument();
    });

    it('renders step 2 with correct title and login instructions', () => {
      render(<ConnectingDevice />);

      const step2 = screen.getByTestId('step-2');
      expect(step2).toHaveAttribute(
        'data-title',
        'Login to your Obvius data acquisition server',
      );

      expect(
        screen.getByText(/Login to your device and navigate to the/),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Log File Data -> Setup/Upload'),
      ).toBeInTheDocument();
    });

    it('renders step 3 with upload channel setup instructions', () => {
      render(<ConnectingDevice />);

      const step3 = screen.getByTestId('step-3');
      expect(step3).toHaveAttribute('data-title', 'Setup an upload channel');

      expect(
        screen.getByText(/There are a few things to change in this step:/),
      ).toBeInTheDocument();
    });

    it('renders step 4 with data upload trigger instructions', () => {
      render(<ConnectingDevice />);

      const step4 = screen.getByTestId('step-4');
      expect(step4).toHaveAttribute(
        'data-title',
        'Trigger sending data from the server to the platform',
      );

      expect(screen.getAllByText(/Press the/).length).toBeGreaterThan(0);
      expect(screen.getByText('Upload Data Now')).toBeInTheDocument();
    });

    it('renders step 5 with device validation instructions', () => {
      render(<ConnectingDevice />);

      const step5 = screen.getByTestId('step-5');
      expect(step5).toHaveAttribute(
        'data-title',
        'Validate device was created',
      );

      expect(screen.getByText(/Navigate to the/)).toBeInTheDocument();
    });
  });

  describe('Step 2 Content', () => {
    it('applies brand styling to navigation path text', () => {
      render(<ConnectingDevice />);

      const navigationPath = screen.getByText('Log File Data -> Setup/Upload');
      expect(navigationPath).toHaveClass('font-bold', 'text-brand-primary');
    });
  });

  describe('Step 3 Content', () => {
    it('renders protocol update instruction with brand styling', () => {
      render(<ConnectingDevice />);

      expect(screen.getByText('Update the protocol to')).toBeInTheDocument();
      const protocolText = screen.getByText('Obvius AcquiSuite XML');
      expect(protocolText).toHaveClass('font-bold', 'text-brand-primary');
    });

    it('renders upload URL with copy button', () => {
      render(<ConnectingDevice />);

      expect(
        screen.getByText('http://solarmoonanalytics.com/upload'),
      ).toBeInTheDocument();
      const copyButton = screen.getByTestId('copy-button');
      expect(copyButton).toBeInTheDocument();
      expect(copyButton).toHaveAttribute(
        'data-datasrc',
        'http://solarmoonanalytics.com/upload',
      );
      expect(copyButton).toHaveAttribute('title', 'Copy Upload URL');
    });

    it('applies correct styling to upload URL', () => {
      render(<ConnectingDevice />);

      const uploadUrl = screen.getByText(
        'http://solarmoonanalytics.com/upload',
      );
      expect(uploadUrl).toHaveClass('me-2');

      const urlContainer = uploadUrl.closest('div');
      expect(urlContainer).toHaveClass(
        'flex',
        'flex-wrap',
        'items-center',
        'font-bold',
        'text-brand-primary',
      );
    });

    it('renders password update instruction', () => {
      render(<ConnectingDevice />);

      expect(
        screen.getByText(
          /Password should be updated with your Access Key retrieved in step 3/,
        ),
      ).toBeInTheDocument();
    });

    it('renders filter setup instruction', () => {
      render(<ConnectingDevice />);

      expect(
        screen.getByText(
          /Optionally set filters to determine which devices are sent to the platform/,
        ),
      ).toBeInTheDocument();
    });

    it('renders Apply button instruction with brand styling', () => {
      render(<ConnectingDevice />);

      expect(screen.getAllByText(/Press the/).length).toBeGreaterThan(0);
      const applyButton = screen.getByText('Apply');
      expect(applyButton).toHaveClass('font-bold', 'text-brand-primary');
    });

    it('renders upload channel image with correct attributes', () => {
      const { container } = render(<ConnectingDevice />);

      const image = container.querySelector('img[alt="brand"]');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'mock-upload-channel.jpg');
      expect(image).toHaveClass('object-fill', 'pe-5', 'ps-3', 'pt-4');
    });

    it('applies correct list styling', () => {
      const { container } = render(<ConnectingDevice />);

      const list = container.querySelector('ul');
      expect(list).toHaveClass('ms-6', 'list-disc');
    });
  });

  describe('Step 4 Content', () => {
    it('applies brand styling to button name', () => {
      render(<ConnectingDevice />);

      const buttonText = screen.getByText('Upload Data Now');
      expect(buttonText).toHaveClass('font-bold', 'text-brand-primary');
    });
  });

  describe('Step 5 Content', () => {
    it('renders site management page link', () => {
      render(<ConnectingDevice />);

      const managementLink = screen.getByText('site management page');
      expect(managementLink).toHaveAttribute(
        'href',
        'https://app.solarmoonanalytics.com/manage',
      );
      expect(managementLink).toHaveClass('text-brand-primary', 'underline');
    });

    it('applies brand styling to "No Site" text', () => {
      render(<ConnectingDevice />);

      const noSiteText = screen.getByText('No Site');
      expect(noSiteText).toHaveClass('font-bold', 'text-brand-primary');
    });

    it('renders support email link', () => {
      render(<ConnectingDevice />);

      const supportLink = screen.getByText('support@solarmoonanalytics.com');
      expect(supportLink).toHaveAttribute(
        'href',
        'mailto:support@solarmoonanalytics.com',
      );
      expect(supportLink).toHaveClass('text-brand-primary', 'underline');
    });

    it('includes device validation instructions', () => {
      render(<ConnectingDevice />);

      expect(
        screen.getByText(/validate you see your device/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /If no device shows up, validate within the Obvius device's logs/,
        ),
      ).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('maintains proper component hierarchy', () => {
      const { container } = render(<ConnectingDevice />);

      const mainDiv = container.firstChild;
      expect(mainDiv).toBeInTheDocument();

      const headingDiv = mainDiv.querySelector(
        '.mb-8.flex.text-2xl.font-bold.sm\\:text-4xl',
      );
      expect(headingDiv).toBeInTheDocument();

      const stepsContainer = mainDiv.querySelector('div:last-child');
      expect(stepsContainer).toBeInTheDocument();
    });

    it('renders steps in correct order', () => {
      render(<ConnectingDevice />);

      const steps = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5'];
      steps.forEach((stepId) => {
        expect(screen.getByTestId(stepId)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('provides descriptive alt text for image', () => {
      const { container } = render(<ConnectingDevice />);

      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'brand');
    });

    it('uses semantic link elements for external navigation', () => {
      render(<ConnectingDevice />);

      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);

      links.forEach((link) => {
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href');
      });
    });

    it('maintains proper text hierarchy with brand styling', () => {
      render(<ConnectingDevice />);

      // Main heading should be prominent
      const heading = screen.getByText('Connecting an Obvius');
      expect(heading.closest('div')).toHaveClass(
        'text-2xl',
        'font-bold',
        'sm:text-4xl',
      );

      // Brand elements should have consistent styling
      const brandElements = screen.getAllByText(
        (content, element) =>
          element && element.classList.contains('text-brand-primary'),
      );
      expect(brandElements.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive text sizing to main heading', () => {
      const { container } = render(<ConnectingDevice />);

      const heading = container.querySelector(
        '.mb-8.flex.text-2xl.font-bold.sm\\:text-4xl',
      );
      expect(heading).toHaveClass('text-2xl', 'sm:text-4xl');
    });

    it('uses responsive layout classes for URL container', () => {
      const { container } = render(<ConnectingDevice />);

      const urlContainer = screen
        .getByText('http://solarmoonanalytics.com/upload')
        .closest('div');
      expect(urlContainer).toHaveClass('flex', 'flex-wrap', 'items-center');
    });
  });

  describe('Integration Features', () => {
    it('integrates with AccessKeyStep component', () => {
      render(<ConnectingDevice />);

      expect(screen.getByTestId('access-key-step')).toBeInTheDocument();
    });

    it('integrates with CopyButton for upload URL', () => {
      render(<ConnectingDevice />);

      const copyButton = screen.getByTestId('copy-button');
      expect(copyButton).toHaveAttribute(
        'data-datasrc',
        'http://solarmoonanalytics.com/upload',
      );
      expect(copyButton).toHaveAttribute('title', 'Copy Upload URL');
    });

    it('provides external links for app navigation', () => {
      render(<ConnectingDevice />);

      const managementLink = screen.getByText('site management page');
      expect(managementLink).toHaveAttribute(
        'href',
        'https://app.solarmoonanalytics.com/manage',
      );
    });

    it('provides support contact information', () => {
      render(<ConnectingDevice />);

      const supportLink = screen.getByText('support@solarmoonanalytics.com');
      expect(supportLink).toHaveAttribute(
        'href',
        'mailto:support@solarmoonanalytics.com',
      );
    });
  });
});
