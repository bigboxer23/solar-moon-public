import { render, screen } from '@testing-library/react';

import Step from '../../../components/docs/Step';

describe('Step Component', () => {
  const mockProps = {
    number: 1,
    title: 'Test Step Title',
    content: 'This is test content for the step component',
  };

  it('renders step with number, title and content', () => {
    render(<Step {...mockProps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Test Step Title')).toBeInTheDocument();
    expect(
      screen.getByText('This is test content for the step component'),
    ).toBeInTheDocument();
  });

  it('renders step without number when not provided', () => {
    const propsWithoutNumber = { ...mockProps, number: null };
    render(<Step {...propsWithoutNumber} />);

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Step Title')).toBeInTheDocument();
  });

  it('renders with React element as content', () => {
    const elementContent = (
      <div data-testid='custom-content'>Custom React Element</div>
    );
    render(<Step content={elementContent} number={2} title='Element Test' />);

    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Custom React Element')).toBeInTheDocument();
  });

  it('applies correct CSS classes to main container', () => {
    const { container } = render(<Step {...mockProps} />);

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('mb-8', 'flex', 'items-baseline');
  });

  it('applies correct styling to number badge when present', () => {
    render(<Step {...mockProps} />);

    const numberBadge = screen.getByText('1');
    expect(numberBadge).toHaveClass(
      'me-2',
      'rounded-full',
      'bg-brand-primary',
      'px-2.5',
      'py-0.5',
      'text-xs',
      'font-medium',
      'text-white',
    );
  });

  it('applies correct styling to title', () => {
    render(<Step {...mockProps} />);

    const title = screen.getByText('Test Step Title');
    expect(title).toHaveClass('mb-2', 'text-xl', 'font-bold');
  });

  it('handles different number values', () => {
    render(<Step content='Test content' number={99} title='High Number' />);

    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('applies spacer when no number provided', () => {
    const { container } = render(
      <Step content='Test' number={null} title='No Number' />,
    );

    const spacer = container.querySelector('.me-2.px-2\\.5.py-0\\.5');
    expect(spacer).toBeInTheDocument();
  });
});
