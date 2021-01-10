import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('<Search />', () => {
  const handleChange = jest.fn();

  it('renders a search input', () => {
    const { getByPlaceholderText } = render(
      <Search handleChange={handleChange} />,
    );
    expect(getByPlaceholderText('국가로 검색')).toBeInTheDocument();
  });

  it('triggers handleChange callback when its value changes', async () => {
    const { container } = render(<Search handleChange={handleChange} />);
    const input = container.firstChild as HTMLInputElement;
    userEvent.type(input, 'asdf');

    expect(input.value).toBe('asdf');
    await waitFor(() => expect(handleChange).toBeCalledTimes(1));
  });
});
