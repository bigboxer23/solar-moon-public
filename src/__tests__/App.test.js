import { render, screen } from '@testing-library/react';

import App from '../App';

jest.mock('react-router-dom');

// Mock all child components to isolate App component structure
jest.mock('../components/about/About', () => {
  return function MockAbout() {
    return <div data-testid='about-page'>About Page</div>;
  };
});

jest.mock('../components/account/AccountActivationError', () => {
  return function MockAccountActivationError() {
    return <div data-testid='account-error-page'>Account Error Page</div>;
  };
});

jest.mock('../components/account/AccountVerified', () => {
  return function MockAccountVerified() {
    return <div data-testid='verified-page'>Account Verified Page</div>;
  };
});

jest.mock('../components/docs/Docs', () => {
  return function MockDocs() {
    return <div data-testid='docs-page'>Docs Page</div>;
  };
});

jest.mock('../components/Footer', () => {
  return function MockFooter() {
    return <div data-testid='footer'>Footer</div>;
  };
});

jest.mock('../components/home/Home', () => {
  return function MockHome() {
    return <div data-testid='home-page'>Home Page</div>;
  };
});

jest.mock('../components/nav/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid='navbar'>Navbar</div>;
  };
});

jest.mock('../components/pricing/PricingPage', () => {
  return function MockPricingPage() {
    return <div data-testid='pricing-page'>Pricing Page</div>;
  };
});

jest.mock('../components/tos/PrivacyPolicy', () => {
  return function MockPrivacyPolicy() {
    return <div data-testid='privacy-page'>Privacy Policy Page</div>;
  };
});

jest.mock('../components/tos/TermsOfService', () => {
  return function MockTermsOfService() {
    return <div data-testid='tos-page'>Terms of Service Page</div>;
  };
});

const renderApp = () => {
  return render(<App />);
};

describe('App Component', () => {
  it('renders without crashing', () => {
    renderApp();
    expect(true).toBe(true);
  });

  it('applies correct CSS classes to main container', () => {
    const { container } = renderApp();

    const appDiv = container.querySelector('.App');
    expect(appDiv).toBeInTheDocument();
    expect(appDiv).toHaveClass('App', 'dark:bg-gray-950');
    expect(appDiv).toHaveAttribute('id', 'scroll');
  });

  it('renders navbar component', () => {
    renderApp();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders footer component', () => {
    renderApp();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders the main layout structure with navbar and footer', () => {
    const { container } = renderApp();

    const appDiv = container.querySelector('.App');
    expect(appDiv).toBeInTheDocument();

    // Should contain navbar and footer
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('maintains proper DOM structure', () => {
    const { container } = renderApp();

    const appDiv = container.querySelector('.App#scroll');
    expect(appDiv).toBeInTheDocument();
    expect(appDiv.children.length).toBeGreaterThan(0);
  });

  it('includes routing structure', () => {
    const { container } = renderApp();

    // The app should contain routing elements (even if mocked)
    // This tests that the component doesn't error when rendering with Router
    expect(container.firstChild).toBeInTheDocument();
  });

  describe('Component Structure', () => {
    it('wraps content in a div with correct styling', () => {
      const { container } = renderApp();

      const appDiv = container.querySelector('.App.dark\\:bg-gray-950');
      expect(appDiv).toBeInTheDocument();
      expect(appDiv).toHaveAttribute('id', 'scroll');
    });

    it('renders consistently', () => {
      // Render multiple times to ensure consistency
      const { container: container1 } = renderApp();
      const { container: container2 } = renderApp();

      const appDiv1 = container1.querySelector('.App');
      const appDiv2 = container2.querySelector('.App');

      expect(appDiv1).toHaveClass('App', 'dark:bg-gray-950');
      expect(appDiv2).toHaveClass('App', 'dark:bg-gray-950');
    });
  });

  describe('Accessibility', () => {
    it('maintains semantic HTML structure', () => {
      renderApp();

      // Should have proper semantic elements rendered through children
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('provides proper document structure with ID for scroll behavior', () => {
      const { container } = renderApp();

      const scrollElement = container.querySelector('#scroll');
      expect(scrollElement).toBeInTheDocument();
      expect(scrollElement).toHaveClass('App');
    });
  });
});
