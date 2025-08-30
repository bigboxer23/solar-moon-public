import { render, screen } from '@testing-library/react';

import FeatureCard from '../../../components/home/FeatureCard';

describe('FeatureCard Component', () => {
  const mockProps = {
    imgPath: '/test-image.jpg',
    title: 'Test Feature',
    description: 'This is a test description for the feature card',
  };

  it('renders all provided props correctly', () => {
    render(<FeatureCard {...mockProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.imgPath);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<FeatureCard {...mockProps} />);

    const card = container.firstChild;
    expect(card).toHaveClass('m-4', 'flex', 'w-80', 'grow', 'flex-col');
    expect(card).toHaveClass('items-center', 'rounded-lg', 'border-2', 'p-8');
  });

  it('renders image with correct styling classes', () => {
    render(<FeatureCard {...mockProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveClass('mb-4', 'w-48');
  });

  it('renders title with brand-primary styling', () => {
    render(<FeatureCard {...mockProps} />);

    const title = screen.getByText(mockProps.title);
    expect(title).toHaveClass(
      'mb-4',
      'text-2xl',
      'font-bold',
      'text-brand-primary',
    );
  });
});
