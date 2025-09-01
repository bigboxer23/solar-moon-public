import { render, screen } from '@testing-library/react';

import Github from '../../../components/about/Github';

// Mock the GitHubCalendar component
jest.mock('react-github-calendar', () => {
  return function MockGitHubCalendar(props) {
    return (
      <div
        data-testid='github-calendar'
        data-username={props.username}
        data-color={props.color}
        data-block-margin={props.blockMargin}
        data-block-size={props.blockSize}
        data-font-size={props.fontSize}
        data-hide-total-count={props.hideTotalCount}
        data-theme={JSON.stringify(props.theme)}
      >
        GitHub Calendar Mock
      </div>
    );
  };
});

describe('Github Component', () => {
  it('renders without crashing', () => {
    render(<Github className='test-class' />);
    expect(true).toBe(true);
  });

  it('renders the platform contributions heading', () => {
    render(<Github className='test-class' />);

    expect(screen.getByText('Platform Contributions')).toBeInTheDocument();
  });

  it('applies correct CSS classes with provided className', () => {
    const { container } = render(<Github className='test-class' />);

    const githubDiv = container.querySelector('.github');
    expect(githubDiv).toHaveClass(
      'test-class',
      'github',
      'hidden',
      'sm:flex',
      'flex-col',
      'items-center',
    );
  });

  it('renders GitHubCalendar component with correct props', () => {
    render(<Github className='test-class' />);

    const calendar = screen.getByTestId('github-calendar');
    expect(calendar).toBeInTheDocument();
    expect(calendar).toHaveAttribute('data-username', 'bigboxer23');
    expect(calendar).toHaveAttribute('data-color', '#5178c2');
    expect(calendar).toHaveAttribute('data-block-margin', '4');
    expect(calendar).toHaveAttribute('data-block-size', '8');
    expect(calendar).toHaveAttribute('data-font-size', '12');
    expect(calendar).toHaveAttribute('data-hide-total-count', 'true');
  });

  it('applies custom theme to GitHubCalendar', () => {
    render(<Github className='test-class' />);

    const calendar = screen.getByTestId('github-calendar');
    const themeData = JSON.parse(calendar.getAttribute('data-theme'));

    expect(themeData).toEqual({
      dark: ['#ebebeb', '#354068', '#405081', '#4a6098', '#556fb1'],
      light: ['#ebebeb', '#354068', '#405081', '#4a6098', '#556fb1'],
    });
  });

  describe('Layout and Styling', () => {
    it('applies correct styling to main container', () => {
      const { container } = render(<Github className='custom-class' />);

      const githubDiv = container.querySelector('.github');
      expect(githubDiv).toHaveClass(
        'custom-class',
        'github',
        'hidden',
        'sm:flex',
        'flex-col',
        'items-center',
      );
    });

    it('applies correct styling to heading container', () => {
      const { container } = render(<Github className='test-class' />);

      const headingContainer = container.querySelector(
        '.mb-8.flex.flex-col.items-center',
      );
      expect(headingContainer).toBeInTheDocument();
      expect(headingContainer).toHaveClass(
        'mb-8',
        'flex',
        'flex-col',
        'items-center',
      );
    });

    it('applies brand styling to heading text', () => {
      render(<Github className='test-class' />);

      const heading = screen.getByText('Platform Contributions');
      expect(heading).toHaveClass(
        'text-2xl',
        'font-bold',
        'text-brand-primary',
      );
    });
  });

  describe('Responsive Design', () => {
    it('hides component on small screens and shows on larger screens', () => {
      const { container } = render(<Github className='test-class' />);

      const githubDiv = container.querySelector('.github');
      expect(githubDiv).toHaveClass('hidden', 'sm:flex');
    });
  });

  describe('GitHub Integration', () => {
    it('configures calendar with proper visual settings', () => {
      render(<Github className='test-class' />);

      const calendar = screen.getByTestId('github-calendar');

      // Visual configuration
      expect(calendar).toHaveAttribute('data-block-margin', '4');
      expect(calendar).toHaveAttribute('data-block-size', '8');
      expect(calendar).toHaveAttribute('data-font-size', '12');
      expect(calendar).toHaveAttribute('data-color', '#5178c2');
    });

    it('configures calendar to hide total count', () => {
      render(<Github className='test-class' />);

      const calendar = screen.getByTestId('github-calendar');
      expect(calendar).toHaveAttribute('data-hide-total-count', 'true');
    });

    it('uses correct GitHub username', () => {
      render(<Github className='test-class' />);

      const calendar = screen.getByTestId('github-calendar');
      expect(calendar).toHaveAttribute('data-username', 'bigboxer23');
    });
  });

  describe('Theme Configuration', () => {
    it('applies consistent colors for both light and dark themes', () => {
      render(<Github className='test-class' />);

      const calendar = screen.getByTestId('github-calendar');
      const theme = JSON.parse(calendar.getAttribute('data-theme'));

      // Both themes should use the same color scheme
      expect(theme.dark).toEqual(theme.light);
      expect(theme.dark).toEqual([
        '#ebebeb',
        '#354068',
        '#405081',
        '#4a6098',
        '#556fb1',
      ]);
    });

    it('uses brand-consistent color palette', () => {
      render(<Github className='test-class' />);

      const calendar = screen.getByTestId('github-calendar');
      const theme = JSON.parse(calendar.getAttribute('data-theme'));

      // Theme should include progressive blue tones
      expect(theme.light[0]).toBe('#ebebeb'); // Light gray base
      expect(theme.light[1]).toBe('#354068'); // Darker blue
      expect(theme.light[4]).toBe('#556fb1'); // Lightest blue
    });
  });

  describe('Accessibility', () => {
    it('provides semantic structure for contributions display', () => {
      render(<Github className='test-class' />);

      const heading = screen.getByText('Platform Contributions');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-2xl', 'font-bold');
    });

    it('maintains proper component hierarchy', () => {
      const { container } = render(<Github className='test-class' />);

      const githubDiv = container.querySelector('.github');
      const headingContainer = githubDiv.querySelector(
        '.mb-8.flex.flex-col.items-center',
      );
      const calendar = screen.getByTestId('github-calendar');

      expect(githubDiv).toContainElement(headingContainer);
      expect(githubDiv).toContainElement(calendar);
    });
  });

  describe('Props Handling', () => {
    it('handles className prop properly', () => {
      const { container: container1 } = render(<Github className='class1' />);
      const { container: container2 } = render(
        <Github className='class2 extra-class' />,
      );

      const githubDiv1 = container1.querySelector('.github');
      const githubDiv2 = container2.querySelector('.github');

      expect(githubDiv1).toHaveClass('class1');
      expect(githubDiv2).toHaveClass('class2', 'extra-class');
    });

    it('handles missing className gracefully', () => {
      const { container } = render(<Github />);

      const githubDiv = container.querySelector('.github');
      expect(githubDiv).toBeInTheDocument();
      expect(githubDiv.className).toContain('github');
    });
  });
});
