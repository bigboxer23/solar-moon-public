import { render, screen } from '@testing-library/react';

import OrganizingDevices from '../../../components/docs/OrganizingDevices';

jest.mock('react-router-dom');

// Mock Step component
jest.mock('../../../components/docs/Step', () => {
  return function MockStep({ number, title, content }) {
    return (
      <div data-number={number} data-testid='step' data-title={title}>
        {number && <span>Step {number}: </span>}
        <h3>{title}</h3>
        <div>{content}</div>
      </div>
    );
  };
});

describe('OrganizingDevices Component', () => {
  it('renders without crashing', () => {
    render(<OrganizingDevices />);
    expect(true).toBe(true);
  });

  it('renders the main heading with brand styling', () => {
    render(<OrganizingDevices />);

    expect(screen.getByText('Organizing devices into a')).toBeInTheDocument();
    expect(screen.getByText('site')).toBeInTheDocument();

    const siteSpan = screen.getByText('site');
    expect(siteSpan).toHaveClass('text-brand-primary');
  });

  it('applies correct styling to the main heading', () => {
    render(<OrganizingDevices />);

    const headingDiv = screen
      .getByText('Organizing devices into a')
      .closest('div');
    expect(headingDiv).toHaveClass(
      'mb-8',
      'flex',
      'text-2xl',
      'font-bold',
      'sm:text-4xl',
    );
  });

  it('renders all step components', () => {
    render(<OrganizingDevices />);

    const steps = screen.getAllByTestId('step');
    expect(steps).toHaveLength(5);

    // Check introductory step without number
    expect(
      screen.getByText('What is the purpose of a site?'),
    ).toBeInTheDocument();

    // Check numbered steps
    expect(screen.getByText('Step 1:')).toBeInTheDocument();
    expect(screen.getByText('Setting up a site')).toBeInTheDocument();

    expect(screen.getByText('Step 2:')).toBeInTheDocument();
    expect(screen.getByText('Open new site dialog')).toBeInTheDocument();

    expect(screen.getByText('Step 3:')).toBeInTheDocument();
    expect(
      screen.getByText('Fill required site information'),
    ).toBeInTheDocument();

    expect(screen.getByText('Step 4:')).toBeInTheDocument();
    expect(screen.getByText('Add devices to the site')).toBeInTheDocument();
  });

  describe('What is the purpose of a site? Step', () => {
    it('renders comprehensive site explanation', () => {
      render(<OrganizingDevices />);

      expect(
        screen.getByText(/Devices can be organized into a site/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /which allows collected data for all devices to be combined/,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText(/aggregated view/)).toBeInTheDocument();
    });

    it('explains site benefits and features', () => {
      render(<OrganizingDevices />);

      expect(
        screen.getByText(
          /convenient way to see all data from a particular location/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /direct comparison of devices which should have similar output/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/weather information such as temperature, UV index/),
      ).toBeInTheDocument();
    });

    it('mentions default No Site group with styling', () => {
      render(<OrganizingDevices />);

      const noSiteSpans = screen.getAllByText('No Site');
      expect(noSiteSpans.length).toBeGreaterThan(0);

      // Check the first instance
      expect(noSiteSpans[0]).toHaveClass('font-bold', 'text-brand-primary');
    });
  });

  describe('Step 1: Setting up a site', () => {
    it('renders navigation to manage page', () => {
      render(<OrganizingDevices />);

      expect(screen.getByText('Navigate to manage')).toBeInTheDocument();

      const pageLink = screen.getByText('page');
      expect(pageLink).toBeInTheDocument();
      expect(pageLink.closest('a')).toHaveAttribute(
        'to',
        'https://app.solarmoonanalytics.com/manage',
      );
      expect(pageLink).toHaveClass('text-brand-primary', 'underline');
    });
  });

  describe('Step 2: Open new site dialog', () => {
    it('renders dropdown selection instructions', () => {
      render(<OrganizingDevices />);

      expect(
        screen.getByText(/Click on the site drop down and select New Site/),
      ).toBeInTheDocument();
    });

    it('includes new site dropdown image', () => {
      render(<OrganizingDevices />);

      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);

      // All images should have the brand alt text
      images.forEach((image) => {
        expect(image).toHaveAttribute('alt', 'brand');
        expect(image).toHaveClass('object-fill');
      });
    });
  });

  describe('Step 3: Fill required site information', () => {
    it('renders form completion instructions', () => {
      render(<OrganizingDevices />);

      expect(
        screen.getByText(/Fill in the information requested in the dialog/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Location data will be used to fetch localized weather data/,
        ),
      ).toBeInTheDocument();
    });

    it('explains weather data integration', () => {
      render(<OrganizingDevices />);

      expect(
        screen.getByText(
          /which will be shown and stored with the site and associated devices/,
        ),
      ).toBeInTheDocument();
    });
  });

  describe('Step 4: Add devices to the site', () => {
    it('renders device addition overview', () => {
      render(<OrganizingDevices />);

      expect(
        screen.getByText(
          /Once the site is created, devices can be added in two different ways/,
        ),
      ).toBeInTheDocument();
    });

    it('renders new device addition method', () => {
      render(<OrganizingDevices />);

      expect(
        screen.getByText(/For new devices, clicking the/),
      ).toBeInTheDocument();
      expect(screen.getByText('Add Device')).toBeInTheDocument();
      expect(
        screen.getByText(/button will show the device creation dialog/),
      ).toBeInTheDocument();

      const addDeviceSpan = screen.getByText('Add Device');
      expect(addDeviceSpan).toHaveClass('font-bold', 'text-brand-primary');
    });

    it('renders existing device migration method', () => {
      render(<OrganizingDevices />);

      expect(
        screen.getByText(/For existing devices, navigate back to the/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Devices will have a Site selector/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /which can be used to move the device into the newly created site/,
        ),
      ).toBeInTheDocument();

      // Check for "No Site" reference in existing devices section
      const noSiteSpans = screen.getAllByText('No Site');
      expect(noSiteSpans.length).toBeGreaterThan(1);

      noSiteSpans.forEach((span) => {
        expect(span).toHaveClass('font-bold', 'text-brand-primary');
      });
    });

    it('includes proper list structure for device addition methods', () => {
      render(<OrganizingDevices />);

      const step4Content = screen.getByText(
        'Add devices to the site',
      ).nextElementSibling;
      const list = step4Content.querySelector('ul');

      expect(list).toHaveClass('ms-6', 'list-disc');
      expect(list.querySelectorAll('li')).toHaveLength(2);
    });

    it('includes images for both device addition methods', () => {
      render(<OrganizingDevices />);

      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThanOrEqual(4);

      // Check image styling
      images.forEach((image) => {
        expect(image).toHaveAttribute('alt', 'brand');
        expect(image).toHaveClass('object-fill');
      });
    });
  });

  describe('Structure and Layout', () => {
    it('maintains proper component hierarchy', () => {
      const { container } = render(<OrganizingDevices />);

      const mainDiv = container.firstChild;
      expect(mainDiv.tagName).toBe('DIV');

      // Should contain heading and steps container
      const headingDiv = mainDiv.querySelector('.mb-8.flex.text-2xl');
      expect(headingDiv).toBeInTheDocument();

      const stepsContainer = mainDiv.querySelector('div:nth-child(2)');
      expect(stepsContainer).toBeInTheDocument();
    });

    it('applies correct image styling variations', () => {
      render(<OrganizingDevices />);

      const images = screen.getAllByRole('img');

      // Different images have different padding combinations
      const imagePaddingClasses = [];
      images.forEach((image) => {
        if (image.classList.contains('pe-5')) {
          imagePaddingClasses.push('pe-5');
        }
        if (image.classList.contains('pe-8')) {
          imagePaddingClasses.push('pe-8');
        }
        if (image.classList.contains('pb-8')) {
          imagePaddingClasses.push('pb-8');
        }
      });

      expect(imagePaddingClasses.length).toBeGreaterThan(0);
    });
  });

  describe('External Links', () => {
    it('includes link to Solar Moon Analytics manage page', () => {
      render(<OrganizingDevices />);

      const manageLink = screen.getByText('page').closest('a');
      expect(manageLink).toHaveAttribute(
        'to',
        'https://app.solarmoonanalytics.com/manage',
      );
    });

    it('applies consistent link styling', () => {
      render(<OrganizingDevices />);

      const pageLink = screen.getByText('page');
      expect(pageLink).toHaveClass('text-brand-primary', 'underline');
    });
  });

  describe('Accessibility', () => {
    it('provides proper heading structure', () => {
      render(<OrganizingDevices />);

      const heading = screen
        .getByText('Organizing devices into a')
        .closest('div');
      expect(heading).toHaveClass('text-2xl', 'font-bold', 'sm:text-4xl');
    });

    it('includes descriptive alt text for images', () => {
      render(<OrganizingDevices />);

      const images = screen.getAllByRole('img');
      images.forEach((image) => {
        expect(image).toHaveAttribute('alt', 'brand');
      });
    });

    it('provides clear step-by-step instructions', () => {
      render(<OrganizingDevices />);

      expect(screen.getByText('Step 1:')).toBeInTheDocument();
      expect(screen.getByText('Step 2:')).toBeInTheDocument();
      expect(screen.getByText('Step 3:')).toBeInTheDocument();
      expect(screen.getByText('Step 4:')).toBeInTheDocument();
    });

    it('maintains semantic list structure', () => {
      render(<OrganizingDevices />);

      const step4Content = screen.getByText(
        'Add devices to the site',
      ).nextElementSibling;
      const list = step4Content.querySelector('ul');

      expect(list).toHaveClass('list-disc');
      expect(list.querySelectorAll('li')).toHaveLength(2);
    });

    it('highlights important UI elements with consistent styling', () => {
      render(<OrganizingDevices />);

      const highlightedElements = [
        ...screen.getAllByText('No Site'),
        screen.getByText('Add Device'),
      ];

      highlightedElements.forEach((element) => {
        expect(element).toHaveClass('font-bold', 'text-brand-primary');
      });
    });
  });
});
