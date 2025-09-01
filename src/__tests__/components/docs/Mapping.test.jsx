import { render, screen } from '@testing-library/react';

import Mapping from '../../../components/docs/Mapping';

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

describe('Mapping Component', () => {
  it('renders without crashing', () => {
    render(<Mapping />);
    expect(true).toBe(true);
  });

  it('renders the main heading with brand styling', () => {
    render(<Mapping />);

    expect(screen.getByText('Mapping data from your')).toBeInTheDocument();
    expect(screen.getByText('devices')).toBeInTheDocument();

    const devicesSpan = screen.getByText('devices');
    expect(devicesSpan).toHaveClass('text-brand-primary');
  });

  it('applies correct styling to the main heading', () => {
    render(<Mapping />);

    const headingDiv = screen
      .getByText('Mapping data from your')
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
    render(<Mapping />);

    const steps = screen.getAllByTestId('step');
    expect(steps).toHaveLength(4);

    // Check introductory step without number
    expect(screen.getByText('What are mappings used for?')).toBeInTheDocument();

    // Check numbered steps
    expect(screen.getByText('Step 1:')).toBeInTheDocument();
    expect(screen.getByText('Adding custom mappings')).toBeInTheDocument();

    expect(screen.getByText('Step 2:')).toBeInTheDocument();
    expect(screen.getByText('Choose custom field name')).toBeInTheDocument();

    expect(screen.getByText('Step 3:')).toBeInTheDocument();
    expect(
      screen.getByText('Choose an attribute to map to'),
    ).toBeInTheDocument();
  });

  describe('What are mappings used for? Step', () => {
    it('renders the explanation text', () => {
      render(<Mapping />);

      expect(
        screen.getByText(/Mappings provide a way to translate names/),
      ).toBeInTheDocument();
      expect(screen.getByText(/analytics and alerts/)).toBeInTheDocument();
    });

    it('renders link to device data documentation', () => {
      render(<Mapping />);

      const docLink = screen.getByText('see documentation here');
      expect(docLink).toBeInTheDocument();
      expect(docLink.closest('a')).toHaveAttribute(
        'to',
        'https://solarmoonanalytics.com/docs/deviceData',
      );
      expect(docLink).toHaveClass('text-brand-primary', 'underline');
    });

    it('explains default mappings and custom alternatives', () => {
      render(<Mapping />);

      expect(
        screen.getByText(/There are a number of mappings provided by default/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /but if you are unable to change your device settings/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /the platform can map to existing device config instead/,
        ),
      ).toBeInTheDocument();
    });
  });

  describe('Step 1: Adding custom mappings', () => {
    it('renders navigation instructions', () => {
      render(<Mapping />);

      expect(screen.getByText(/Navigate to/)).toBeInTheDocument();

      const mappingPageLink = screen.getByText('mapping page');
      expect(mappingPageLink).toBeInTheDocument();
      expect(mappingPageLink.closest('a')).toHaveAttribute(
        'to',
        'https://app.solarmoonanalytics.com/mapping',
      );
      expect(mappingPageLink).toHaveClass('text-brand-primary', 'underline');
    });

    it('mentions alternative access through manage page', () => {
      render(<Mapping />);

      expect(
        screen.getByText(
          /There is also a link to mapping available on the top of the manage page/,
        ),
      ).toBeInTheDocument();
    });

    it('includes mapping link image', () => {
      render(<Mapping />);

      const images = screen.getAllByRole('img');
      const mappingImage = images.find((img) => img.alt === 'brand');
      expect(mappingImage).toBeInTheDocument();
      expect(mappingImage).toHaveClass('object-fill', 'pe-8', 'ps-3', 'pt-4');
    });
  });

  describe('Step 2: Choose custom field name', () => {
    it('renders field name instructions', () => {
      render(<Mapping />);

      expect(screen.getByText(/Under the/)).toBeInTheDocument();
      expect(screen.getByText('Mapping Name')).toBeInTheDocument();
      expect(
        screen.getByText(
          /field, enter the name your device is using for the data point/,
        ),
      ).toBeInTheDocument();
    });

    it('applies brand styling to Mapping Name text', () => {
      render(<Mapping />);

      const mappingNameSpan = screen.getByText('Mapping Name');
      expect(mappingNameSpan).toHaveClass('font-bold', 'text-brand-primary');
    });

    it('includes uniqueness note', () => {
      render(<Mapping />);

      expect(
        screen.getByText(
          /Note: mapping names need to be unique and cannot be duplicated/,
        ),
      ).toBeInTheDocument();
    });

    it('includes custom field name image', () => {
      render(<Mapping />);

      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(1);

      // All images should have the brand alt text and proper styling
      images.forEach((image) => {
        expect(image).toHaveAttribute('alt', 'brand');
        expect(image).toHaveClass('object-fill');
      });
    });
  });

  describe('Step 3: Choose an attribute to map to', () => {
    it('renders attribute selection instructions', () => {
      render(<Mapping />);

      expect(
        screen.getByText(
          /From the attribute drop down, select which Solar Moon attribute/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/field you would like to map the data into/),
      ).toBeInTheDocument();
    });

    it('includes add button and error handling information', () => {
      render(<Mapping />);

      expect(
        screen.getByText(
          /Press the add button after choosing this to create the mapping/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /If there are any issues with the chosen values, error text will display/,
        ),
      ).toBeInTheDocument();
    });
  });

  describe('Structure and Layout', () => {
    it('maintains proper component hierarchy', () => {
      const { container } = render(<Mapping />);

      const mainDiv = container.firstChild;
      expect(mainDiv.tagName).toBe('DIV');

      // Should contain heading and steps container
      const headingDiv = mainDiv.querySelector('.mb-8.flex.text-2xl');
      expect(headingDiv).toBeInTheDocument();

      const stepsContainer = mainDiv.querySelector('div:nth-child(2)');
      expect(stepsContainer).toBeInTheDocument();
    });

    it('includes line breaks for proper text formatting', () => {
      render(<Mapping />);

      const step2Content = screen.getByText(
        'Choose custom field name',
      ).nextElementSibling;
      expect(step2Content.innerHTML).toContain('<br>');
    });
  });

  describe('External Links', () => {
    it('includes links to Solar Moon Analytics resources', () => {
      render(<Mapping />);

      // Documentation link
      const docLink = screen.getByText('see documentation here').closest('a');
      expect(docLink).toHaveAttribute(
        'to',
        'https://solarmoonanalytics.com/docs/deviceData',
      );

      // App mapping page link
      const mappingLink = screen.getByText('mapping page').closest('a');
      expect(mappingLink).toHaveAttribute(
        'to',
        'https://app.solarmoonanalytics.com/mapping',
      );
    });

    it('applies consistent link styling', () => {
      render(<Mapping />);

      const links = [
        screen.getByText('see documentation here'),
        screen.getByText('mapping page'),
      ];

      links.forEach((link) => {
        expect(link).toHaveClass('text-brand-primary', 'underline');
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper heading structure', () => {
      render(<Mapping />);

      const heading = screen.getByText('Mapping data from your').closest('div');
      expect(heading).toHaveClass('text-2xl', 'font-bold', 'sm:text-4xl');
    });

    it('includes descriptive alt text for images', () => {
      render(<Mapping />);

      const images = screen.getAllByRole('img');
      images.forEach((image) => {
        expect(image).toHaveAttribute('alt', 'brand');
      });
    });

    it('provides clear step-by-step instructions', () => {
      render(<Mapping />);

      expect(screen.getByText('Step 1:')).toBeInTheDocument();
      expect(screen.getByText('Step 2:')).toBeInTheDocument();
      expect(screen.getByText('Step 3:')).toBeInTheDocument();
    });
  });
});
