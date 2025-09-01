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

  describe('Content Structure', () => {
    it('renders main heading with proper styling', () => {
      render(<About />);

      const heading = screen.getByText('Solar Moon Analytics');
      expect(heading).toHaveClass('text-brand-primary');
    });

    it('contains complete mission statement', () => {
      render(<About />);

      expect(
        screen.getByText(
          /utilizing data and AI technologies to create top-tier solutions/i,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/lead the way in leveraging technology/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/make clean energy more accessible and efficient/i),
      ).toBeInTheDocument();
    });

    it('includes all detailed section content', () => {
      render(<About />);

      expect(
        screen.getByText(/serving both local and global markets/i),
      ).toBeInTheDocument();

      expect(
        screen.getByText(/addressing environmental concerns/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/reducing the carbon footprint/i),
      ).toBeInTheDocument();

      // Data and AI section
      expect(
        screen.getByText(/harness the potential of cutting-edge technologies/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/pivotal in solving complex challenges/i),
      ).toBeInTheDocument();

      // Solutions section
      expect(
        screen.getByText(/don't settle for mediocrity/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/set a new standard/i)).toBeInTheDocument();

      // Solar focus section
      expect(
        screen.getByText(/sustainable and renewable energy source/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/innovative software solutions/i),
      ).toBeInTheDocument();

      // ROI section
      expect(screen.getByText(/data-driven insights/i)).toBeInTheDocument();
      expect(screen.getByText(/AI-driven optimizations/i)).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('applies responsive styling classes', () => {
      const { container } = render(<About />);

      const contentDiv = container.querySelector('.fade-in');
      expect(contentDiv).toHaveClass('sm:mx-5', 'sm:rounded-lg', 'sm:p-8');
    });

    it('maintains proper text hierarchy', () => {
      render(<About />);

      const mainHeading = screen.getByText('About').closest('div');
      expect(mainHeading).toHaveClass(
        'mb-8',
        'flex',
        'justify-center',
        'text-4xl',
        'font-bold',
      );
    });

    it('applies consistent section heading styling', () => {
      render(<About />);

      const sectionHeadings = [
        'Location',
        'Mission and Passion',
        'Data and AI Expertise',
        'Best-in-Class Solutions',
        'Solar Energy Focus',
        'ROI Enhancement',
      ];

      sectionHeadings.forEach((headingText) => {
        const heading = screen.getByText(headingText);
        expect(heading).toHaveClass(
          'text-lg',
          'font-bold',
          'text-brand-primary',
        );
      });
    });

    it('includes proper paragraph structure with line breaks', () => {
      const { container } = render(<About />);

      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();

      // Should contain multiple br tags for proper formatting
      const lineBreaks = paragraph.querySelectorAll('br');
      expect(lineBreaks.length).toBeGreaterThan(5);
    });
  });

  describe('Accessibility', () => {
    it('provides semantic main element', () => {
      const { container } = render(<About />);

      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('about');
    });

    it('maintains proper heading hierarchy', () => {
      render(<About />);

      // Main heading should be prominent
      const mainHeading = screen.getByText('About').closest('div');
      expect(mainHeading).toHaveClass('text-4xl', 'font-bold');

      // Section headings should be smaller but still prominent
      const sectionHeading = screen.getByText('Location');
      expect(sectionHeading).toHaveClass('text-lg', 'font-bold');
    });

    it('uses descriptive content for company overview', () => {
      render(<About />);

      expect(
        screen.getByText(/Minneapolis-based software development firm/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/commitment to clean energy/i),
      ).toBeInTheDocument();
    });
  });

  describe('Content Completeness', () => {
    it('covers all key business aspects', () => {
      render(<About />);

      // Geographic presence
      expect(screen.getByText(/Minneapolis/i)).toBeInTheDocument();
      expect(screen.getByText(/Minnesota/i)).toBeInTheDocument();

      // Technology stack
      expect(screen.getByText(/data analytics/i)).toBeInTheDocument();
      expect(screen.getByText(/artificial intelligence/i)).toBeInTheDocument();

      // Industry focus
      expect(screen.getAllByText(/solar energy/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/clean energy/i).length).toBeGreaterThan(0);

      // Business value
      expect(screen.getByText(/return on investment/i)).toBeInTheDocument();
      expect(screen.getAllByText(/ROI/i).length).toBeGreaterThan(0);
    });

    it('includes environmental and sustainability messaging', () => {
      render(<About />);

      expect(screen.getByText(/environmental concerns/i)).toBeInTheDocument();
      expect(screen.getByText(/carbon footprint/i)).toBeInTheDocument();
      expect(screen.getByText(/sustainable/i)).toBeInTheDocument();
      expect(screen.getByText(/renewable energy/i)).toBeInTheDocument();
    });

    it('emphasizes technical expertise and innovation', () => {
      render(<About />);

      expect(
        screen.getByText(/cutting-edge technologies/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/industry-leading solutions/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/innovative software solutions/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/data-driven insights/i)).toBeInTheDocument();
    });
  });
});
