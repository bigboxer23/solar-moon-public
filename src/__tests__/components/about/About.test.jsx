import { render, screen } from '@testing-library/react';

import About from '../../../components/about/About';

describe('About Component', () => {
  it('renders the main heading', () => {
    render(<About />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Solar Moon Analytics')).toBeInTheDocument();
  });

  it('renders all section headings', () => {
    render(<About />);

    const sectionHeadings = [
      'Location',
      'Mission and Passion',
      'Data and AI Expertise',
      'Best-in-Class Solutions',
      'Solar Energy Focus',
      'ROI Enhancement',
    ];

    sectionHeadings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it('displays company description', () => {
    render(<About />);

    expect(
      screen.getByText(/Minneapolis-based software development firm/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/clean energy/i)).toBeInTheDocument();
    expect(screen.getByText(/data and AI technologies/i)).toBeInTheDocument();
  });

  it('applies correct CSS classes to main container', () => {
    const { container } = render(<About />);

    const main = container.querySelector('main');
    expect(main).toHaveClass(
      'about',
      'flex',
      'flex-col',
      'items-center',
      'bg-brand-primary-light',
      'dark:bg-gray-950',
    );
  });

  it('applies correct styling to content container', () => {
    const { container } = render(<About />);

    const contentDiv = container.querySelector('.fade-in');
    expect(contentDiv).toHaveClass(
      'fade-in',
      'mx-2',
      'my-8',
      'max-w-[55rem]',
      'bg-white',
      'p-6',
      'shadow-panel',
      'dark:bg-gray-800',
      'dark:text-gray-100',
    );
  });

  it('renders section headings with brand-primary styling', () => {
    render(<About />);

    const locationHeading = screen.getByText('Location');
    expect(locationHeading).toHaveClass(
      'text-lg',
      'font-bold',
      'text-brand-primary',
    );
  });

  it('mentions key company values and focus areas', () => {
    render(<About />);

    expect(screen.getByText(/environmental concerns/i)).toBeInTheDocument();
    expect(screen.getByText(/carbon footprint/i)).toBeInTheDocument();
    expect(screen.getByText(/artificial intelligence/i)).toBeInTheDocument();
    expect(screen.getByText(/return on investment/i)).toBeInTheDocument();
  });

  it('displays Minneapolis location information', () => {
    render(<About />);

    expect(
      screen.getByText(/Based in Minneapolis, Minnesota/i),
    ).toBeInTheDocument();
  });
});
