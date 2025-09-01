import { render, screen } from '@testing-library/react';

import DeviceData from '../../../components/docs/DeviceData';

jest.mock('react-router-dom');

// Mock Step component
jest.mock('../../../components/docs/Step', () => {
  return function MockStep({ title, content }) {
    return (
      <div data-testid='step' data-title={title}>
        <h3>{title}</h3>
        <div>{content}</div>
      </div>
    );
  };
});

describe('DeviceData Component', () => {
  it('renders without crashing', () => {
    render(<DeviceData />);
    expect(true).toBe(true);
  });

  it('renders the main heading', () => {
    render(<DeviceData />);

    expect(
      screen.getByText('Understanding data collected from devices'),
    ).toBeInTheDocument();
  });

  it('applies correct styling to the main heading', () => {
    render(<DeviceData />);

    const headingDiv = screen
      .getByText('Understanding data collected from devices')
      .closest('div');
    expect(headingDiv).toHaveClass(
      'mb-8',
      'flex',
      'text-2xl',
      'font-bold',
      'sm:text-4xl',
    );
  });

  it('renders both step components', () => {
    render(<DeviceData />);

    const steps = screen.getAllByTestId('step');
    expect(steps).toHaveLength(2);

    expect(screen.getByText('Fields collected')).toBeInTheDocument();
    expect(
      screen.getByText('Additionally mapped field names'),
    ).toBeInTheDocument();
  });

  describe('Fields Collected Step', () => {
    it('renders the introduction text', () => {
      render(<DeviceData />);

      expect(
        screen.getByText(
          'Solar Moon collects 5 specific fields from each device to display data and manage alerts. The 5 primary fields collected are:',
        ),
      ).toBeInTheDocument();
    });

    it('renders all primary field types with units', () => {
      render(<DeviceData />);

      // Check for Current field with unit (use getAllByText for duplicate text)
      expect(screen.getAllByText('Current').length).toBeGreaterThan(0);
      expect(screen.getByText('A')).toBeInTheDocument();

      // Check for Voltage field with unit (use getAllByText for duplicate text)
      expect(screen.getAllByText('Voltage').length).toBeGreaterThan(0);
      expect(screen.getByText('V')).toBeInTheDocument();

      // Check for System Power Factor (use getAllByText for duplicate text)
      expect(screen.getAllByText('System Power Factor').length).toBeGreaterThan(
        0,
      );

      // Check for Energy Consumption with unit (use getAllByText for duplicate text)
      expect(screen.getAllByText('Energy Consumption').length).toBeGreaterThan(
        0,
      );
      expect(screen.getByText('kWH')).toBeInTheDocument();

      // Check for Real Power with unit (use getAllByText for duplicate text)
      expect(screen.getAllByText('Real Power').length).toBeGreaterThan(0);
      expect(screen.getByText('kW')).toBeInTheDocument();
    });

    it('applies correct styling to units', () => {
      render(<DeviceData />);

      const unitSpans = screen.getAllByText(/^[AVkW]+H?$/);
      unitSpans.forEach((span) => {
        expect(span).toHaveClass('text-xs', 'text-text-secondary');
      });
    });
  });

  describe('Additionally Mapped Field Names Step', () => {
    it('renders the explanation text', () => {
      render(<DeviceData />);

      expect(
        screen.getByText(
          'By default Solar Moon will look for data from the devices with the above names. However, there are a number of additional accepted names for these fields:',
        ),
      ).toBeInTheDocument();
    });

    it('renders alternative field names for Current', () => {
      render(<DeviceData />);

      expect(screen.getByText('Average Current')).toBeInTheDocument();
      expect(screen.getByText('I a')).toBeInTheDocument();
    });

    it('renders alternative field names for Voltage', () => {
      render(<DeviceData />);

      expect(screen.getByText('Average Voltage (L-N)')).toBeInTheDocument();
      expect(screen.getByText('Voltage, Line to Neutral')).toBeInTheDocument();
      expect(screen.getByText('Vll ab')).toBeInTheDocument();
    });

    it('renders alternative field names for System Power Factor', () => {
      render(<DeviceData />);

      expect(
        screen.getByText('Total (System) Power Factor'),
      ).toBeInTheDocument();
      expect(screen.getByText('Power Factor')).toBeInTheDocument();
      expect(screen.getByText('PF sign tot')).toBeInTheDocument();
      expect(screen.getByText('Total System Power Factor')).toBeInTheDocument();
    });

    it('renders alternative field names for Energy Consumption', () => {
      render(<DeviceData />);

      expect(screen.getByText('Total Energy Consumption')).toBeInTheDocument();
      expect(screen.getByText('kWh del+rec')).toBeInTheDocument();
    });

    it('renders alternative field names for Real Power', () => {
      render(<DeviceData />);

      expect(screen.getByText('Total Real Power')).toBeInTheDocument();
    });

    it('renders mapping documentation link', () => {
      render(<DeviceData />);

      const mappingLink = screen.getByText('mapping device data');
      expect(mappingLink).toBeInTheDocument();
      expect(mappingLink.closest('a')).toHaveAttribute(
        'to',
        'https://solarmoonanalytics.com/docs/mapping',
      );
      expect(mappingLink).toHaveClass('text-brand-primary', 'underline');
    });

    it('renders complete mapping reference text', () => {
      render(<DeviceData />);

      expect(
        screen.getByText(/If your devices are using different labels/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/for custom mapping solutions./),
      ).toBeInTheDocument();
    });
  });

  describe('Structure and Layout', () => {
    it('maintains proper component hierarchy', () => {
      const { container } = render(<DeviceData />);

      const mainDiv = container.firstChild;
      expect(mainDiv.tagName).toBe('DIV');

      // Should contain heading and steps container
      const headingDiv = mainDiv.querySelector('.mb-8.flex.text-2xl');
      expect(headingDiv).toBeInTheDocument();

      const stepsContainer = mainDiv.querySelector('div:nth-child(2)');
      expect(stepsContainer).toBeInTheDocument();
    });

    it('renders nested lists with proper styling', () => {
      render(<DeviceData />);

      // Find step content containing nested lists
      const step2Content = screen.getByText(
        'Additionally mapped field names',
      ).nextElementSibling;

      const nestedLists = step2Content.querySelectorAll('ul ul');
      expect(nestedLists.length).toBeGreaterThan(0);

      nestedLists.forEach((list) => {
        expect(list).toHaveClass('list-inside', 'list-disc', 'pl-4');
      });
    });

    it('applies correct styling to introduction text', () => {
      render(<DeviceData />);

      const introTexts = screen.getAllByText(/Solar Moon/);
      introTexts.forEach((text) => {
        const textDiv = text.closest('div');
        if (
          textDiv &&
          textDiv.classList.contains('align-self-start') &&
          textDiv.classList.contains('mb-4')
        ) {
          expect(textDiv).toHaveClass(
            'align-self-start',
            'mb-4',
            'text-black',
            'dark:text-neutral-100',
          );
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper heading structure', () => {
      render(<DeviceData />);

      const heading = screen.getByText(
        'Understanding data collected from devices',
      );
      expect(heading.closest('div')).toHaveClass(
        'text-2xl',
        'font-bold',
        'sm:text-4xl',
      );
    });

    it('maintains semantic list structures', () => {
      render(<DeviceData />);

      const step1 = screen.getByText('Fields collected').nextElementSibling;
      const primaryList = step1.querySelector('ul');
      expect(primaryList).toHaveClass('list-disc');

      const step2 = screen.getByText(
        'Additionally mapped field names',
      ).nextElementSibling;
      const alternativesList = step2.querySelector('ul');
      expect(alternativesList).toHaveClass('list-disc');
    });

    it('provides clear external link for additional documentation', () => {
      render(<DeviceData />);

      const mappingLink = screen.getByText('mapping device data');
      expect(mappingLink.closest('a')).toHaveAttribute(
        'to',
        'https://solarmoonanalytics.com/docs/mapping',
      );
      expect(mappingLink).toHaveClass('text-brand-primary', 'underline');
    });
  });
});
