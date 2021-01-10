import { render } from '@testing-library/react';
import Loading from './Loading';

describe('<Loading />', () => {
  it('renders a spinner', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });

  it('renders a spinner with specific size (100)', () => {
    const { container } = render(<Loading size={100} />);
    expect(container).toMatchSnapshot();
  });
});
