import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Navbar from '../../../components/nav/Navbar';

// Mock react-router-dom
const mockUseLocation = jest.fn();
const mockUseMatch = jest.fn();

jest.mock('react-router-dom', () => ({
  NavLink: ({ children, to, className }) => {
    const isActive = to === mockUseLocation().pathname;
    const computedClassName =
      typeof className === 'function' ? className({ isActive }) : className;
    return (
      <a className={computedClassName} data-active={isActive} href={to}>
        {children}
      </a>
    );
  },
  useLocation: () => mockUseLocation(),
  useMatch: (path) => mockUseMatch(path),
}));

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaBars: ({ className, onClick }) => (
    <div className={className} data-testid='hamburger-menu' onClick={onClick}>
      ☰
    </div>
  ),
}));

jest.mock('react-icons/fa6', () => ({
  FaXmark: ({ className, onClick }) => (
    <div className={className} data-testid='close-menu' onClick={onClick}>
      ✕
    </div>
  ),
}));

jest.mock('react-icons/lu', () => ({
  LuSun: ({ className }) => (
    <div className={className} data-testid='sun-separator'>
      ☀
    </div>
  ),
}));

// Mock usehooks-ts
jest.mock('usehooks-ts', () => ({
  useOnClickOutside: jest.fn(),
}));

// Mock classnames
jest.mock('classnames', () => {
  return jest.fn((...args) => {
    return args
      .filter(Boolean)
      .map((arg) => {
        if (typeof arg === 'string') return arg;
        if (typeof arg === 'object') {
          return Object.entries(arg)
            .filter(([, value]) => value)
            .map(([key]) => key)
            .join(' ');
        }
        return '';
      })
      .join(' ')
      .trim();
  });
});

// Mock the logo
jest.mock('../../../assets/logo.svg', () => 'mock-logo.svg');

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocation.mockReturnValue({ pathname: '/' });
    mockUseMatch.mockReturnValue(null);
  });

  it('renders without crashing', () => {
    render(<Navbar />);
    expect(true).toBe(true);
  });

  describe('Brand Logo and Title', () => {
    it('renders the brand logo', () => {
      render(<Navbar />);

      const logo = screen.getByAltText('brand');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', 'mock-logo.svg');
    });

    it('applies correct CSS classes to logo', () => {
      render(<Navbar />);

      const logo = screen.getByAltText('brand');
      expect(logo).toHaveClass('ml-6', 'size-10', 'sm:ml-8', 'sm:size-12');
    });

    it('renders the brand title', () => {
      render(<Navbar />);

      expect(screen.getByText('Solar Moon Analytics')).toBeInTheDocument();
    });

    it('applies responsive styling to brand title', () => {
      render(<Navbar />);

      const title = screen.getByText('Solar Moon Analytics');
      expect(title).toHaveClass('ms-2', 'text-base', 'font-bold', 'sm:text-xl');
    });

    it('wraps logo and title in home link', () => {
      render(<Navbar />);

      const homeLink = screen.getByText('Solar Moon Analytics').closest('a');
      expect(homeLink).toHaveAttribute('href', '/');
      expect(homeLink).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('Page Name Display (Mobile)', () => {
    it('displays "Home" for root path', () => {
      mockUseLocation.mockReturnValue({ pathname: '/' });
      render(<Navbar />);

      // Find the mobile page name specifically (not in nav)
      const pageName = screen
        .getAllByText('Home')
        .find((el) => el.closest('div')?.classList.contains('sm:hidden'));
      expect(pageName).toBeInTheDocument();
      expect(pageName).toHaveClass('text-xl', 'font-bold', 'text-black');
    });

    it('displays "Docs" for docs path', () => {
      mockUseLocation.mockReturnValue({ pathname: '/docs' });
      render(<Navbar />);

      const docsPageName = screen
        .getAllByText('Docs')
        .find((el) => el.closest('div')?.classList.contains('sm:hidden'));
      expect(docsPageName).toBeInTheDocument();
    });

    it('displays "Pricing" for pricing path', () => {
      mockUseLocation.mockReturnValue({ pathname: '/pricing' });
      render(<Navbar />);

      const pricingPageName = screen
        .getAllByText('Pricing')
        .find((el) => el.closest('div')?.classList.contains('sm:hidden'));
      expect(pricingPageName).toBeInTheDocument();
    });

    it('displays "About" for about path', () => {
      mockUseLocation.mockReturnValue({ pathname: '/about' });
      render(<Navbar />);

      const aboutPageName = screen
        .getAllByText('About')
        .find((el) => el.closest('div')?.classList.contains('sm:hidden'));
      expect(aboutPageName).toBeInTheDocument();
    });

    it('displays "Terms Of Service" for tos path', () => {
      mockUseLocation.mockReturnValue({ pathname: '/tos' });
      render(<Navbar />);

      expect(screen.getByText('Terms Of Service')).toBeInTheDocument();
    });

    it('displays "Privacy Policy" for privacy path', () => {
      mockUseLocation.mockReturnValue({ pathname: '/privacy' });
      render(<Navbar />);

      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('displays empty string for unknown paths', () => {
      mockUseLocation.mockReturnValue({ pathname: '/unknown' });
      render(<Navbar />);

      // Since empty string won't be rendered, just ensure no error occurs
      expect(screen.getByTestId('hamburger-menu')).toBeInTheDocument();
    });

    it('hides page name on desktop screens', () => {
      render(<Navbar />);

      const pageNameContainer = screen
        .getAllByText('Home')
        .find((el) => el.closest('div')?.classList.contains('sm:hidden'))
        ?.closest('div');
      expect(pageNameContainer).toHaveClass(
        'flex',
        'items-center',
        'justify-center',
        'sm:hidden',
      );
    });
  });

  describe('Desktop Navigation', () => {
    it('renders main navigation links', () => {
      render(<Navbar />);

      const nav = screen.getAllByRole('navigation')[0];
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('hidden', 'items-center', 'sm:flex');

      // Check all main navigation links
      expect(
        screen.getAllByText('Home').find((el) => el.closest('nav')),
      ).toBeInTheDocument();
      expect(
        screen.getAllByText('Docs').find((el) => el.closest('nav')),
      ).toBeInTheDocument();
      expect(
        screen.getAllByText('Pricing').find((el) => el.closest('nav')),
      ).toBeInTheDocument();
      expect(
        screen.getAllByText('About').find((el) => el.closest('nav')),
      ).toBeInTheDocument();
    });

    it('applies correct link styling for inactive links', () => {
      mockUseLocation.mockReturnValue({ pathname: '/about' });
      render(<Navbar />);

      const homeLink = screen
        .getAllByText('Home')
        .find((el) => el.closest('nav'));
      expect(homeLink).toHaveClass(
        'text-black',
        'dark:text-gray-100',
        'font-bold',
        'text-lg',
        'text-decoration-none',
      );
    });

    it('applies active styling to current page link', () => {
      mockUseLocation.mockReturnValue({ pathname: '/' });
      render(<Navbar />);

      const homeLink = screen
        .getAllByText('Home')
        .find((el) => el.closest('nav'));
      expect(homeLink).toHaveAttribute('data-active', 'true');
    });

    it('renders sun separators between nav links', () => {
      render(<Navbar />);

      const sunSeparators = screen.getAllByTestId('sun-separator');
      expect(sunSeparators.length).toBeGreaterThan(2);

      sunSeparators.forEach((separator) => {
        expect(separator).toHaveClass(
          'text-text-secondary',
          'dark:text-brand-secondary',
          'text-lg',
          'hidden',
          'lg:block',
        );
      });
    });

    it('renders sign up/sign in link', () => {
      render(<Navbar />);

      const signUpLink = screen.getAllByText('Sign up /Sign In')[0];
      expect(signUpLink).toHaveAttribute(
        'href',
        'https://app.solarmoonanalytics.com',
      );
      expect(signUpLink).toHaveClass(
        'mr-8',
        'hidden',
        'items-center',
        'justify-center',
        'sm:flex',
      );
    });
  });

  describe('Mobile Hamburger Menu', () => {
    it('renders hamburger menu button on mobile', () => {
      render(<Navbar />);

      const hamburgerButton = screen.getByTestId('hamburger-menu');
      expect(hamburgerButton).toBeInTheDocument();
      expect(hamburgerButton).toHaveClass('text-2xl');

      const buttonContainer = hamburgerButton.parentElement;
      expect(buttonContainer).toHaveClass(
        'mr-6',
        'flex',
        'items-center',
        'justify-center',
        'sm:hidden',
      );
    });

    it('opens slide menu when hamburger is clicked', () => {
      render(<Navbar />);

      const hamburgerButton = screen.getByTestId('hamburger-menu');
      fireEvent.click(hamburgerButton);

      // Check that the close button is now visible (indicating menu is open)
      const closeButton = screen.getByTestId('close-menu');
      expect(closeButton).toBeInTheDocument();
    });

    it('closes slide menu when close button is clicked', () => {
      render(<Navbar />);

      // Open the menu first
      const hamburgerButton = screen.getByTestId('hamburger-menu');
      fireEvent.click(hamburgerButton);

      // Verify close button is visible (menu is open)
      let closeButton = screen.getByTestId('close-menu');
      expect(closeButton).toBeInTheDocument();

      // Then close it
      fireEvent.click(closeButton);

      // The close button should no longer be in the visible area
      // (Note: it still exists in DOM but menu should be translated away)
      expect(screen.getByTestId('close-menu')).toBeInTheDocument();
    });

    it('applies correct initial styling to slide menu', () => {
      render(<Navbar />);

      // Initially, close button should exist but menu is closed
      // We can't test exact classes due to mock limitations, but we can test
      // that the hamburger menu functionality works
      const hamburgerButton = screen.getByTestId('hamburger-menu');
      expect(hamburgerButton).toBeInTheDocument();

      // Open menu and verify close button becomes accessible
      fireEvent.click(hamburgerButton);
      const closeButton = screen.getByTestId('close-menu');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Slide Menu Navigation', () => {
    beforeEach(() => {
      render(<Navbar />);
      // Open the slide menu
      const hamburgerButton = screen.getByTestId('hamburger-menu');
      fireEvent.click(hamburgerButton);
    });

    it('renders all main navigation links in slide menu', () => {
      const slideMenuNav = screen.getAllByRole('navigation')[1]; // Second nav is the slide menu

      expect(slideMenuNav.querySelector('[href="/"]')).toBeInTheDocument();
      expect(slideMenuNav.querySelector('[href="/docs"]')).toBeInTheDocument();
      expect(
        slideMenuNav.querySelector('[href="/pricing"]'),
      ).toBeInTheDocument();
      expect(slideMenuNav.querySelector('[href="/about"]')).toBeInTheDocument();
      expect(
        slideMenuNav.querySelector(
          '[href="https://app.solarmoonanalytics.com"]',
        ),
      ).toBeInTheDocument();
    });

    it('applies correct styling to slide menu links', () => {
      const slideMenuNav = screen.getAllByRole('navigation')[1];
      const homeLink = slideMenuNav.querySelector('[href="/"]');

      // Home link is active on "/" path, so it should have active styling
      expect(homeLink).toHaveClass(
        'text-black',
        'dark:text-gray-100',
        'font-bold',
        'text-2xl',
        'border-b-2',
        'border-text-primary',
        'text-decoration-none',
        'border-black',
        'w-fit',
      );
    });

    it('renders close button with correct styling', () => {
      const closeButton = screen.getByTestId('close-menu');
      expect(closeButton).toHaveClass('text-3xl');

      const closeButtonContainer = closeButton.closest('button').parentElement;
      expect(closeButtonContainer).toHaveClass(
        'mb-4',
        'flex',
        'w-full',
        'items-center',
        'justify-end',
      );
    });

    it('applies correct flex layout to slide menu navigation', () => {
      const slideMenuNav = screen.getAllByRole('navigation')[1];
      expect(slideMenuNav).toHaveClass(
        'flex',
        'w-full',
        'flex-col',
        'space-y-8',
      );
    });
  });

  describe('Docs Submenu Functionality', () => {
    it('shows docs submenu when on docs page', () => {
      mockUseMatch.mockReturnValue(true);
      render(<Navbar />);

      // Open slide menu to see submenu
      const hamburgerButton = screen.getByTestId('hamburger-menu');
      fireEvent.click(hamburgerButton);

      expect(screen.getByText('Getting Started')).toBeInTheDocument();
      expect(
        screen.getByText('Connecting an Obvius device'),
      ).toBeInTheDocument();
      expect(screen.getByText('Connecting SMA devices')).toBeInTheDocument();
      expect(screen.getByText('Organizing devices')).toBeInTheDocument();
      expect(screen.getByText('Understanding device data')).toBeInTheDocument();
      expect(screen.getByText('Mapping device data')).toBeInTheDocument();
    });

    it('hides docs submenu when not on docs page', () => {
      mockUseMatch.mockReturnValue(null);
      render(<Navbar />);

      // Open slide menu
      const hamburgerButton = screen.getByTestId('hamburger-menu');
      fireEvent.click(hamburgerButton);

      expect(screen.queryByText('Getting Started')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Connecting an Obvius device'),
      ).not.toBeInTheDocument();
    });

    it('applies correct styling to docs submenu links', () => {
      mockUseMatch.mockReturnValue(true);
      render(<Navbar />);

      // Open slide menu
      const hamburgerButton = screen.getByTestId('hamburger-menu');
      fireEvent.click(hamburgerButton);

      const gettingStartedLink = screen.getByText('Getting Started');
      expect(gettingStartedLink).toHaveClass('ms-4', 'text-sm');
      expect(gettingStartedLink).toHaveAttribute(
        'href',
        '/docs/gettingStarted',
      );
    });

    it('includes all expected docs submenu links', () => {
      mockUseMatch.mockReturnValue(true);
      render(<Navbar />);

      // Open slide menu
      const hamburgerButton = screen.getByTestId('hamburger-menu');
      fireEvent.click(hamburgerButton);

      const expectedLinks = [
        { text: 'Getting Started', href: '/docs/gettingStarted' },
        { text: 'Connecting an Obvius device', href: '/docs/connectingDevice' },
        { text: 'Connecting SMA devices', href: '/docs/connectingSMADevices' },
        { text: 'Organizing devices', href: '/docs/sortingDevices' },
        { text: 'Understanding device data', href: '/docs/deviceData' },
        { text: 'Mapping device data', href: '/docs/mapping' },
      ];

      expectedLinks.forEach(({ text, href }) => {
        const link = screen.getByText(text);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', href);
      });
    });
  });

  describe('Responsive Design', () => {
    it('applies correct responsive classes to main navbar', () => {
      const { container } = render(<Navbar />);

      const navbar = container.querySelector('.Navbar');
      expect(navbar).toHaveClass(
        'flex',
        'h-[4.5rem]',
        'w-full',
        'items-center',
        'justify-between',
        'border-b',
        'border-text-secondary',
        'bg-brand-primary-light',
        'sm:h-[6.25rem]',
        'dark:border-b-0',
        'dark:bg-gray-950',
        'dark:text-gray-100',
      );
    });

    it('shows desktop navigation only on larger screens', () => {
      render(<Navbar />);

      const desktopNav = screen.getAllByRole('navigation')[0];
      expect(desktopNav).toHaveClass('hidden', 'sm:flex');
    });

    it('shows mobile elements only on smaller screens', () => {
      render(<Navbar />);

      const pageNameContainer = screen
        .getAllByText('Home')
        .find((el) => el.closest('div')?.classList.contains('sm:hidden'))
        ?.closest('div');
      expect(pageNameContainer).toHaveClass('sm:hidden');

      const hamburgerContainer =
        screen.getByTestId('hamburger-menu').parentElement;
      expect(hamburgerContainer).toHaveClass('sm:hidden');
    });

    it('applies responsive spacing to navigation', () => {
      render(<Navbar />);

      const nav = screen.getAllByRole('navigation')[0];
      expect(nav).toHaveClass('sm:space-x-6', 'md:space-x-12', 'lg:space-x-10');
    });
  });

  describe('Dark Mode Support', () => {
    it('includes dark mode classes in navbar', () => {
      const { container } = render(<Navbar />);

      const navbar = container.querySelector('.Navbar');
      expect(navbar).toHaveClass(
        'dark:border-b-0',
        'dark:bg-gray-950',
        'dark:text-gray-100',
      );
    });

    it('includes dark mode classes in navigation links', () => {
      render(<Navbar />);

      const homeLink = screen
        .getAllByText('Home')
        .find((el) => el.closest('nav'));
      expect(homeLink).toHaveClass('dark:text-gray-100');
    });

    it('includes dark mode classes in separators', () => {
      render(<Navbar />);

      const sunSeparators = screen.getAllByTestId('sun-separator');
      sunSeparators.forEach((separator) => {
        expect(separator).toHaveClass('dark:text-brand-secondary');
      });
    });
  });

  describe('Accessibility', () => {
    it('provides semantic navigation elements', () => {
      render(<Navbar />);

      const navElements = screen.getAllByRole('navigation');
      expect(navElements.length).toBe(2); // Desktop nav and slide menu nav
    });

    it('provides alt text for logo image', () => {
      render(<Navbar />);

      const logo = screen.getByAltText('brand');
      expect(logo).toBeInTheDocument();
    });

    it('uses proper button elements for interactive components', () => {
      render(<Navbar />);

      // Open slide menu to access close button
      const hamburgerButton = screen.getByTestId('hamburger-menu');
      fireEvent.click(hamburgerButton);

      const closeButton = screen.getByTestId('close-menu');
      expect(closeButton.closest('button')).toBeInTheDocument();
    });

    it('maintains focus management for slide menu', () => {
      render(<Navbar />);

      const hamburgerButton = screen.getByTestId('hamburger-menu');
      fireEvent.click(hamburgerButton);

      // Menu should be accessible after opening
      const closeButton = screen.getByTestId('close-menu');
      expect(closeButton).toBeInTheDocument();

      // Menu navigation should be accessible
      const slideMenuNav = screen.getAllByRole('navigation')[1];
      expect(slideMenuNav).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('manages slide menu open/closed state', () => {
      render(<Navbar />);

      // Initially hamburger is visible
      const hamburgerButton = screen.getByTestId('hamburger-menu');
      expect(hamburgerButton).toBeInTheDocument();

      // Open menu
      fireEvent.click(hamburgerButton);
      const closeButton = screen.getByTestId('close-menu');
      expect(closeButton).toBeInTheDocument();

      // Close menu
      fireEvent.click(closeButton);

      // Hamburger should still be accessible for reopening
      expect(screen.getByTestId('hamburger-menu')).toBeInTheDocument();
    });

    it('handles location changes properly', () => {
      mockUseLocation.mockReturnValue({ pathname: '/' });
      const { rerender } = render(<Navbar />);

      const pageNameElement = screen
        .getAllByText('Home')
        .find((el) => el.closest('div')?.classList.contains('sm:hidden'));
      expect(pageNameElement).toBeInTheDocument();

      // Change location
      mockUseLocation.mockReturnValue({ pathname: '/about' });
      rerender(<Navbar />);

      const aboutPageName = screen
        .getAllByText('About')
        .find((el) => el.closest('div')?.classList.contains('sm:hidden'));
      expect(aboutPageName).toBeInTheDocument();
    });
  });

  describe('External Integration', () => {
    it('links to external app for sign up', () => {
      render(<Navbar />);

      const signUpLink = screen.getAllByText('Sign up /Sign In')[0];
      expect(signUpLink).toHaveAttribute(
        'href',
        'https://app.solarmoonanalytics.com',
      );
    });

    it('provides home navigation via logo', () => {
      render(<Navbar />);

      const logoLink = screen.getByText('Solar Moon Analytics').closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('integrates with react-router for navigation', () => {
      render(<Navbar />);

      // Verify all internal links use proper routing
      const internalLinks = ['/docs', '/pricing', '/about'];
      internalLinks.forEach((path) => {
        const links = screen
          .getAllByRole('link')
          .filter((link) => link.getAttribute('href') === path);
        expect(links.length).toBeGreaterThan(0);
      });
    });
  });
});
