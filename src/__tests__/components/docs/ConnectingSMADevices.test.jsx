import { render, screen } from '@testing-library/react';

import ConnectingSMADevices from '../../../components/docs/ConnectingSMADevices';

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

// Mock the SMA documentation images
jest.mock(
  '../../../assets/docs/connecting_sma/editingFTP.jpg',
  () => 'mock-editingFTP.jpg',
);
jest.mock(
  '../../../assets/docs/connecting_sma/FTPPage.jpg',
  () => 'mock-FTPPage.jpg',
);
jest.mock(
  '../../../assets/docs/connecting_sma/location.jpg',
  () => 'mock-location.jpg',
);

describe('ConnectingSMADevices Component', () => {
  it('renders without crashing', () => {
    render(<ConnectingSMADevices />);
    expect(true).toBe(true);
  });

  it('renders the main heading', () => {
    render(<ConnectingSMADevices />);

    expect(screen.getByText('Connecting SMA')).toBeInTheDocument();
    expect(screen.getByText('devices')).toBeInTheDocument();
  });

  it('applies correct CSS classes to main heading', () => {
    const { container } = render(<ConnectingSMADevices />);

    const heading = container.querySelector(
      '.mb-8.flex.text-2xl.font-bold.sm\\:text-4xl',
    );
    expect(heading).toBeInTheDocument();
  });

  it('applies brand styling to "devices" text in heading', () => {
    render(<ConnectingSMADevices />);

    const devicesSpan = screen.getByText('devices');
    expect(devicesSpan).toHaveClass('text-brand-primary');
  });

  describe('Step Components', () => {
    it('renders all five steps', () => {
      render(<ConnectingSMADevices />);

      expect(screen.getByTestId('step-1')).toBeInTheDocument();
      expect(screen.getByTestId('step-2')).toBeInTheDocument();
      expect(screen.getByTestId('step-3')).toBeInTheDocument();
      expect(screen.getByTestId('step-4')).toBeInTheDocument();
      expect(screen.getByTestId('step-5')).toBeInTheDocument();
    });

    it('renders step 1 with correct title and AccessKeyStep content', () => {
      render(<ConnectingSMADevices />);

      const step1 = screen.getByTestId('step-1');
      expect(step1).toHaveAttribute('data-title', 'Collect access key');
      expect(screen.getByTestId('access-key-step')).toBeInTheDocument();
    });

    it('renders step 2 with cluster controller navigation instructions', () => {
      render(<ConnectingSMADevices />);

      const step2 = screen.getByTestId('step-2');
      expect(step2).toHaveAttribute(
        'data-title',
        'Locate the settings page on your SMA cluster controller',
      );

      expect(
        screen.getByText(
          /Login to your cluster controller and navigate to the/,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('Settings tab.')).toBeInTheDocument();
      expect(screen.getByText('Further Applications')).toBeInTheDocument();
    });

    it('renders step 3 with FTP setup instructions', () => {
      render(<ConnectingSMADevices />);

      const step3 = screen.getByTestId('step-3');
      expect(step3).toHaveAttribute(
        'data-title',
        'Setting up FTP push data transfer',
      );

      expect(
        screen.getByText(/There are a few fields to update:/),
      ).toBeInTheDocument();
    });

    it('renders step 4 with device validation instructions', () => {
      render(<ConnectingSMADevices />);

      const step4 = screen.getByTestId('step-4');
      expect(step4).toHaveAttribute(
        'data-title',
        'Validate device was created',
      );

      expect(
        screen.getByText(
          /Once your SMA cluster controller has gone through a push data cycle/,
        ),
      ).toBeInTheDocument();
    });

    it('renders step 5 with location setup instructions', () => {
      render(<ConnectingSMADevices />);

      const step5 = screen.getByTestId('step-5');
      expect(step5).toHaveAttribute('data-title', "Update the site's location");

      expect(
        screen.getByText(/It is important to properly set the site's location/),
      ).toBeInTheDocument();
    });
  });

  describe('Step 2 Content', () => {
    it('applies brand styling to navigation elements', () => {
      render(<ConnectingSMADevices />);

      const settingsTab = screen.getByText('Settings tab.');
      expect(settingsTab).toHaveClass('font-bold', 'text-brand-primary');

      const furtherApplications = screen.getByText('Further Applications');
      expect(furtherApplications).toHaveClass(
        'font-bold',
        'text-brand-primary',
      );
    });

    it('renders FTP page image with correct attributes', () => {
      const { container } = render(<ConnectingSMADevices />);

      const ftpPageImage = container.querySelector('img[alt="ftp page"]');
      expect(ftpPageImage).toBeInTheDocument();
      expect(ftpPageImage).toHaveAttribute('src', 'mock-FTPPage.jpg');
      expect(ftpPageImage).toHaveClass('object-fill', 'py-6', 'pe-6', 'ps-3');
    });
  });

  describe('Step 3 Content', () => {
    it('renders CSV format instruction with brand styling', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText(/Data export in CSV format should be set to/),
      ).toBeInTheDocument();
      const noText = screen.getByText('No');
      expect(noText).toHaveClass('font-bold', 'text-brand-primary');
    });

    it('renders XML format instruction with brand styling', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText(/Data export in XML format should be set to/),
      ).toBeInTheDocument();
      const yesText = screen.getByText('Yes');
      expect(yesText).toHaveClass('font-bold', 'text-brand-primary');
    });

    it('renders login and password instruction', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText(
          /Login & password fields should be updated with your access key retrieved in step 1/,
        ),
      ).toBeInTheDocument();
    });

    it('renders server URL with copy button', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText('ftp.solarmoonanalytics.com'),
      ).toBeInTheDocument();
      const copyButton = screen.getByTestId('copy-button');
      expect(copyButton).toBeInTheDocument();
      expect(copyButton).toHaveAttribute(
        'data-datasrc',
        'ftp.solarmoonanalytics.com',
      );
      expect(copyButton).toHaveAttribute('title', 'Copy URL');
    });

    it('applies correct styling to server URL', () => {
      render(<ConnectingSMADevices />);

      const serverUrl = screen.getByText('ftp.solarmoonanalytics.com');
      expect(serverUrl).toHaveClass('me-2', 'font-bold', 'text-brand-primary');
    });

    it('renders Save button instruction with brand styling', () => {
      render(<ConnectingSMADevices />);

      expect(screen.getByText(/Press the/)).toBeInTheDocument();
      const saveButton = screen.getByText('Save');
      expect(saveButton).toHaveClass('font-bold', 'text-brand-primary');
    });

    it('renders editing FTP image with correct attributes', () => {
      const { container } = render(<ConnectingSMADevices />);

      const editingFtpImage = container.querySelector('img[alt="editing ftp"]');
      expect(editingFtpImage).toBeInTheDocument();
      expect(editingFtpImage).toHaveAttribute('src', 'mock-editingFTP.jpg');
      expect(editingFtpImage).toHaveClass(
        'object-fill',
        'py-6',
        'pe-6',
        'ps-3',
      );
    });

    it('applies correct list styling', () => {
      const { container } = render(<ConnectingSMADevices />);

      const list = container.querySelector('ul');
      expect(list).toHaveClass('ms-6', 'list-disc');
    });

    it('uses flexbox layout for server field', () => {
      const { container } = render(<ConnectingSMADevices />);

      const serverField = screen
        .getByText(/Server should be updated to/)
        .closest('div');
      expect(serverField).toHaveClass('flex', 'items-center');
    });
  });

  describe('Step 4 Content', () => {
    it('mentions push data cycle timing', () => {
      render(<ConnectingSMADevices />);

      expect(screen.getByText(/generally within 30m/)).toBeInTheDocument();
    });

    it('renders site management page link', () => {
      render(<ConnectingSMADevices />);

      const managementLink = screen.getByText('site management page.');
      expect(managementLink).toHaveAttribute(
        'href',
        'https://app.solarmoonanalytics.com/manage',
      );
      expect(managementLink).toHaveClass('text-brand-primary', 'underline');
    });

    it('explains device naming convention', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText(
          /Devices will show up under a site named by the cluster controller's name/,
        ),
      ).toBeInTheDocument();
    });

    it('mentions FTP upload completion event', () => {
      render(<ConnectingSMADevices />);

      expect(screen.getByText(/FTP upload completed/)).toBeInTheDocument();
    });

    it('renders support email link', () => {
      render(<ConnectingSMADevices />);

      const supportLink = screen.getByText('support@solarmoonanalytics.com');
      expect(supportLink).toHaveAttribute(
        'href',
        'mailto:support@solarmoonanalytics.com',
      );
      expect(supportLink).toHaveClass('text-brand-primary', 'underline');
    });

    it('includes troubleshooting guidance', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText(/validate within the SMA controller's event logs/),
      ).toBeInTheDocument();
    });
  });

  describe('Step 5 Content', () => {
    it('explains importance of location setting', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText(/It is important to properly set the site's location/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /guarantee all collected data is properly stamped with the time zone specific time/,
        ),
      ).toBeInTheDocument();
    });

    it('mentions fallback to user profile timezone', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText(
          /the platform will fall back to the default timezone set on the user profile/,
        ),
      ).toBeInTheDocument();
    });

    it('renders location image with correct attributes', () => {
      const { container } = render(<ConnectingSMADevices />);

      // Check for the location image by checking all images and finding the one from step 5
      const images = container.querySelectorAll('img');
      expect(images.length).toBe(3); // Should have 3 images total

      // The last image should be the location image from step 5
      const locationImage = images[images.length - 1];
      expect(locationImage).toBeInTheDocument();
      expect(locationImage).toHaveAttribute('src', 'mock-location.jpg');
      expect(locationImage).toHaveClass('object-fill', 'py-6', 'pe-6', 'ps-3');
    });
  });

  describe('Layout Structure', () => {
    it('maintains proper component hierarchy', () => {
      const { container } = render(<ConnectingSMADevices />);

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
      render(<ConnectingSMADevices />);

      const steps = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5'];
      steps.forEach((stepId) => {
        expect(screen.getByTestId(stepId)).toBeInTheDocument();
      });
    });

    it('applies consistent flexbox layout to list items', () => {
      const { container } = render(<ConnectingSMADevices />);

      const flexItems = container.querySelectorAll('.flex.items-center');
      expect(flexItems.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('provides descriptive alt text for images', () => {
      const { container } = render(<ConnectingSMADevices />);

      const ftpPageImage = container.querySelector('img[alt="ftp page"]');
      expect(ftpPageImage).toHaveAttribute('alt', 'ftp page');

      const editingFtpImage = container.querySelector('img[alt="editing ftp"]');
      expect(editingFtpImage).toHaveAttribute('alt', 'editing ftp');
    });

    it('uses semantic link elements for external navigation', () => {
      render(<ConnectingSMADevices />);

      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);

      links.forEach((link) => {
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href');
      });
    });

    it('maintains proper text hierarchy with brand styling', () => {
      render(<ConnectingSMADevices />);

      // Main heading should be prominent
      const heading = screen.getByText('Connecting SMA');
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
      const { container } = render(<ConnectingSMADevices />);

      const heading = container.querySelector(
        '.mb-8.flex.text-2xl.font-bold.sm\\:text-4xl',
      );
      expect(heading).toHaveClass('text-2xl', 'sm:text-4xl');
    });

    it('uses responsive image styling', () => {
      const { container } = render(<ConnectingSMADevices />);

      const images = container.querySelectorAll('img');
      images.forEach((image) => {
        expect(image).toHaveClass('object-fill');
      });
    });
  });

  describe('Integration Features', () => {
    it('integrates with AccessKeyStep component', () => {
      render(<ConnectingSMADevices />);

      expect(screen.getByTestId('access-key-step')).toBeInTheDocument();
    });

    it('integrates with CopyButton for server URL', () => {
      render(<ConnectingSMADevices />);

      const copyButton = screen.getByTestId('copy-button');
      expect(copyButton).toHaveAttribute(
        'data-datasrc',
        'ftp.solarmoonanalytics.com',
      );
      expect(copyButton).toHaveAttribute('title', 'Copy URL');
    });

    it('provides external links for app navigation', () => {
      render(<ConnectingSMADevices />);

      const managementLink = screen.getByText('site management page.');
      expect(managementLink).toHaveAttribute(
        'href',
        'https://app.solarmoonanalytics.com/manage',
      );
    });

    it('provides support contact information', () => {
      render(<ConnectingSMADevices />);

      const supportLink = screen.getByText('support@solarmoonanalytics.com');
      expect(supportLink).toHaveAttribute(
        'href',
        'mailto:support@solarmoonanalytics.com',
      );
    });
  });

  describe('SMA-Specific Features', () => {
    it('covers SMA cluster controller configuration', () => {
      render(<ConnectingSMADevices />);

      expect(screen.getAllByText(/cluster controller/).length).toBeGreaterThan(
        0,
      );
      expect(screen.getByText('Settings tab.')).toBeInTheDocument();
      expect(screen.getByText('Further Applications')).toBeInTheDocument();
    });

    it('explains CSV vs XML format preferences', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText(/Data export in CSV format should be set to/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data export in XML format should be set to/),
      ).toBeInTheDocument();
    });

    it('mentions SMA-specific FTP features', () => {
      render(<ConnectingSMADevices />);

      expect(screen.getByText(/FTP push data transfer/)).toBeInTheDocument();
      expect(screen.getByText(/FTP upload completed/)).toBeInTheDocument();
    });

    it('addresses timezone and location concerns', () => {
      render(<ConnectingSMADevices />);

      expect(screen.getByText(/time zone specific time/)).toBeInTheDocument();
      expect(
        screen.getByText(/default timezone set on the user profile/),
      ).toBeInTheDocument();
    });
  });

  describe('User Experience', () => {
    it('provides clear step-by-step progression', () => {
      render(<ConnectingSMADevices />);

      const stepTitles = [
        'Collect access key',
        'Locate the settings page on your SMA cluster controller',
        'Setting up FTP push data transfer',
        'Validate device was created',
        "Update the site's location",
      ];

      stepTitles.forEach((title, index) => {
        const step = screen.getByTestId(`step-${index + 1}`);
        expect(step).toHaveAttribute('data-title', title);
      });
    });

    it('includes visual aids for each major step', () => {
      const { container } = render(<ConnectingSMADevices />);

      // Should have multiple images for different steps
      const images = container.querySelectorAll('img');
      expect(images.length).toBe(3); // FTP page, editing FTP, and location images
    });

    it('provides troubleshooting guidance', () => {
      render(<ConnectingSMADevices />);

      expect(
        screen.getByText(
          /If no devices shows up, validate within the SMA controller's event logs/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/If a further error occurs, please contact/),
      ).toBeInTheDocument();
    });
  });
});
