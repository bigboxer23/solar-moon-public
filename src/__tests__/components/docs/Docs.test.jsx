import { render, screen } from '@testing-library/react';

import Docs from '../../../components/docs/Docs';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('../../../__mocks__/react-router-dom'),
  useMatch: jest.fn(),
}));

// Mock all child components
jest.mock('../../../components/docs/ConnectingDevice', () => {
  return function MockConnectingDevice() {
    return <div data-testid='connecting-device'>Connecting Device Content</div>;
  };
});

jest.mock('../../../components/docs/ConnectingSMADevices', () => {
  return function MockConnectingSMADevices() {
    return (
      <div data-testid='connecting-sma-devices'>
        Connecting SMA Devices Content
      </div>
    );
  };
});

jest.mock('../../../components/docs/DeviceData', () => {
  return function MockDeviceData() {
    return <div data-testid='device-data'>Device Data Content</div>;
  };
});

jest.mock('../../../components/docs/GettingStarted', () => {
  return function MockGettingStarted() {
    return <div data-testid='getting-started'>Getting Started Content</div>;
  };
});

jest.mock('../../../components/docs/Mapping', () => {
  return function MockMapping() {
    return <div data-testid='mapping'>Mapping Content</div>;
  };
});

jest.mock('../../../components/docs/OrganizingDevices', () => {
  return function MockOrganizingDevices() {
    return (
      <div data-testid='organizing-devices'>Organizing Devices Content</div>
    );
  };
});

const { useMatch } = require('react-router-dom');

describe('Docs Component', () => {
  beforeEach(() => {
    useMatch.mockClear();
  });

  it('renders without crashing', () => {
    useMatch.mockReturnValue(null);
    render(<Docs />);
    expect(true).toBe(true);
  });

  it('applies correct CSS classes to main container', () => {
    useMatch.mockReturnValue(null);
    const { container } = render(<Docs />);

    const main = container.querySelector('main');
    expect(main).toHaveClass(
      'docs',
      'flex',
      'w-full',
      'flex-col',
      'items-center',
      'bg-brand-primary-light',
      'sm:p-8',
      'dark:bg-gray-950',
    );
  });

  it('renders the documentation layout structure', () => {
    useMatch.mockReturnValue(null);
    const { container } = render(<Docs />);

    const contentDiv = container.querySelector(
      '.fade-in.mx-2.my-8.flex.w-\\[75rem\\]',
    );
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).toHaveClass(
      'fade-in',
      'mx-2',
      'my-8',
      'flex',
      'w-[75rem]',
      'max-w-full',
      'bg-white',
      'p-6',
      'shadow-panel',
      'sm:mx-5',
      'sm:rounded-lg',
      'sm:p-8',
      'dark:bg-gray-800',
      'dark:text-gray-100',
    );
  });

  it('renders the table of contents', () => {
    useMatch.mockReturnValue(null);
    render(<Docs />);

    expect(screen.getByText('Topics')).toBeInTheDocument();
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Connecting an Obvius device')).toBeInTheDocument();
    expect(screen.getByText('Connecting SMA devices')).toBeInTheDocument();
    expect(screen.getByText('Organizing devices')).toBeInTheDocument();
    expect(screen.getByText('Understanding device data')).toBeInTheDocument();
    expect(screen.getByText('Mapping device data')).toBeInTheDocument();
  });

  describe('Navigation Links', () => {
    it('renders all navigation links with correct routes', () => {
      useMatch.mockReturnValue(null);
      render(<Docs />);

      const gettingStartedLink = screen
        .getByText('Getting Started')
        .closest('a');
      expect(gettingStartedLink).toHaveAttribute('to', '/docs/gettingStarted');

      const connectingDeviceLink = screen
        .getByText('Connecting an Obvius device')
        .closest('a');
      expect(connectingDeviceLink).toHaveAttribute(
        'to',
        '/docs/connectingDevice',
      );

      const connectingSMALink = screen
        .getByText('Connecting SMA devices')
        .closest('a');
      expect(connectingSMALink).toHaveAttribute(
        'to',
        '/docs/connectingSMADevices',
      );

      const organizingDevicesLink = screen
        .getByText('Organizing devices')
        .closest('a');
      expect(organizingDevicesLink).toHaveAttribute(
        'to',
        '/docs/sortingDevices',
      );

      const deviceDataLink = screen
        .getByText('Understanding device data')
        .closest('a');
      expect(deviceDataLink).toHaveAttribute('to', '/docs/deviceData');

      const mappingLink = screen.getByText('Mapping device data').closest('a');
      expect(mappingLink).toHaveAttribute('to', '/docs/mapping');
    });

    it('applies active class to Getting Started link when no docName is provided', () => {
      useMatch.mockReturnValue(null);
      render(<Docs />);

      const gettingStartedLink = screen
        .getByText('Getting Started')
        .closest('a');
      expect(gettingStartedLink).toHaveClass('active');
    });

    it('applies correct CSS classes to navigation links', () => {
      useMatch.mockReturnValue(null);
      render(<Docs />);

      const links = screen.getAllByTestId('navlink');
      links.forEach((link) => {
        expect(link).toHaveClass(
          'group',
          'flex',
          'items-center',
          'rounded-md',
          'text-sm',
          'transition-all',
          'duration-150',
          'hover:bg-neutral-100',
          'sm:p-2',
          'dark:hover:bg-gray-700',
        );
      });
    });
  });

  describe('Content Rendering Based on Route', () => {
    it('renders GettingStarted component by default', () => {
      useMatch.mockReturnValue(null);
      render(<Docs />);

      expect(screen.getByTestId('getting-started')).toBeInTheDocument();
    });

    it('renders GettingStarted component when docName is gettingStarted', () => {
      useMatch.mockReturnValue({ params: { docName: 'gettingStarted' } });
      render(<Docs />);

      expect(screen.getByTestId('getting-started')).toBeInTheDocument();
    });

    it('renders ConnectingDevice component when docName is connectingDevice', () => {
      useMatch.mockReturnValue({ params: { docName: 'connectingDevice' } });
      render(<Docs />);

      expect(screen.getByTestId('connecting-device')).toBeInTheDocument();
      expect(screen.queryByTestId('getting-started')).not.toBeInTheDocument();
    });

    it('renders ConnectingSMADevices component when docName is connectingSMADevices', () => {
      useMatch.mockReturnValue({ params: { docName: 'connectingSMADevices' } });
      render(<Docs />);

      expect(screen.getByTestId('connecting-sma-devices')).toBeInTheDocument();
      expect(screen.queryByTestId('getting-started')).not.toBeInTheDocument();
    });

    it('renders OrganizingDevices component when docName is sortingDevices', () => {
      useMatch.mockReturnValue({ params: { docName: 'sortingDevices' } });
      render(<Docs />);

      expect(screen.getByTestId('organizing-devices')).toBeInTheDocument();
      expect(screen.queryByTestId('getting-started')).not.toBeInTheDocument();
    });

    it('renders DeviceData component when docName is deviceData', () => {
      useMatch.mockReturnValue({ params: { docName: 'deviceData' } });
      render(<Docs />);

      expect(screen.getByTestId('device-data')).toBeInTheDocument();
      expect(screen.queryByTestId('getting-started')).not.toBeInTheDocument();
    });

    it('renders Mapping component when docName is mapping', () => {
      useMatch.mockReturnValue({ params: { docName: 'mapping' } });
      render(<Docs />);

      expect(screen.getByTestId('mapping')).toBeInTheDocument();
      expect(screen.queryByTestId('getting-started')).not.toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('renders table of contents with proper styling', () => {
      useMatch.mockReturnValue(null);
      const { container } = render(<Docs />);

      const toc = container.querySelector('.toc');
      expect(toc).toHaveClass(
        'toc',
        'hidden',
        'min-w-40',
        'flex-col',
        'space-y-1',
        'sm:flex',
      );
    });

    it('renders content body with proper styling', () => {
      useMatch.mockReturnValue(null);
      const { container } = render(<Docs />);

      const body = container.querySelector('.body');
      expect(body).toHaveClass('body', 'grow', 'ps-4');
    });

    it('renders topics header with correct styling', () => {
      useMatch.mockReturnValue(null);
      render(<Docs />);

      const topicsHeader = screen.getByText('Topics');
      expect(topicsHeader).toBeInTheDocument();

      // Find the div containing the Topics text with the correct classes
      const { container } = render(<Docs />);
      const topicsDiv = container.querySelector('.mb-4.flex.text-lg.font-bold');
      expect(topicsDiv).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('hides table of contents on small screens', () => {
      useMatch.mockReturnValue(null);
      const { container } = render(<Docs />);

      const toc = container.querySelector('.toc');
      expect(toc).toHaveClass('hidden', 'sm:flex');
    });

    it('applies responsive padding and margins', () => {
      useMatch.mockReturnValue(null);
      const { container } = render(<Docs />);

      const main = container.querySelector('main');
      expect(main).toHaveClass('sm:p-8');

      const contentDiv = container.querySelector('.fade-in');
      expect(contentDiv).toHaveClass('sm:mx-5', 'sm:rounded-lg', 'sm:p-8');
    });
  });
});
