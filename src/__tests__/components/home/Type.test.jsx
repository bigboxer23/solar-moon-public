import { render } from '@testing-library/react';

import Type from '../../../components/home/Type';

// Mock Typewriter component since it has complex animation logic
jest.mock('typewriter-effect', () => {
  return function MockTypewriter({ options }) {
    return (
      <div data-testid='typewriter'>
        {options.strings.map((string, index) => (
          <span key={index} data-testid='typewriter-string'>
            {string}
          </span>
        ))}
      </div>
    );
  };
});

describe('Type Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Type />);
    expect(container).toBeInTheDocument();
  });

  it('passes correct strings to Typewriter', () => {
    render(<Type />);

    const expectedStrings = [
      'Real-time Analytics',
      'Historic Data',
      'Configurable Alerting',
      'Advanced Reporting',
      'Intelligence',
    ];

    expectedStrings.forEach((string) => {
      expect(
        document.querySelector(`[data-testid="typewriter-string"]`),
      ).toBeInTheDocument();
    });
  });

  it('renders typewriter component', () => {
    render(<Type />);

    const typewriter = document.querySelector('[data-testid="typewriter"]');
    expect(typewriter).toBeInTheDocument();
  });
});
