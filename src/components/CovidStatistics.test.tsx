import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { covidCountryStatMock } from '../mocks/modules/covid-19-api';
import CovidStatistics from './CovidStatistics';

describe('<CovidStatistics />', () => {
  const useFetch = jest.spyOn(require('../hooks/useFetch'), 'useFetch');

  describe('without any data', () => {
    afterEach(() => {
      useFetch.mockClear();
    });

    it('renders a spinner while loading data', async () => {
      useFetch.mockReturnValue({
        data: null,
        error: null,
        loading: true,
      });
      const { container } = render(<CovidStatistics />);

      expect(useFetch).toBeCalledTimes(1);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders an error message with no data fetched', async () => {
      useFetch.mockReturnValue({
        data: null,
        error: new Error('Request failed.'),
        loading: false,
      });
      const { getByText } = render(<CovidStatistics />);

      expect(useFetch).toBeCalledTimes(1);
      expect(getByText('Request failed.')).toBeInTheDocument();
    });
  });

  describe('with data', () => {
    beforeEach(() => {
      useFetch.mockReturnValue({
        data: covidCountryStatMock,
        error: null,
        loading: false,
      });
    });

    it('renders COVID stat table with data fetched', async () => {
      const { getByText } = render(<CovidStatistics />);

      expect(useFetch).toBeCalledTimes(1);
      expect(getByText(/South Korea/)).toBeInTheDocument();
    });

    it('filters data when search field receives a value (South Korea)', async () => {
      const { getByPlaceholderText, getByTestId, queryByText } = render(
        <CovidStatistics />,
      );
      // Enter search keyword 'K'
      const searchField = getByPlaceholderText('국가로 검색');
      userEvent.type(searchField, 'K');
      // Mongolia is filtered out
      await waitFor(() => expect(queryByText('Mongolia')).toBeNull());
      expect(getByTestId('tbody')).toMatchSnapshot();
    });

    it('sorts data upside down when the active column heading is clicked (Taiwan, South Korea, Mongolia)', async () => {
      const { getByTestId } = render(<CovidStatistics />);
      // Click country
      userEvent.click(getByTestId('country'));
      expect(getByTestId('tbody')).toMatchSnapshot();
    });

    it('reverts data order back to original when same column is clicked twice (Mongolia, South Korea, Taiwan)', async () => {
      const { getByTestId } = render(<CovidStatistics />);
      // Double click country
      userEvent.dblClick(getByTestId('country'));
      expect(getByTestId('tbody')).toMatchSnapshot();
    });

    it('sorts data in descending direction when a column heading is clicked (South Korea, Monglia, Taiwan)', async () => {
      const { getByTestId } = render(<CovidStatistics />);
      // Click country
      userEvent.click(getByTestId('confirmed'));
      expect(getByTestId('tbody')).toMatchSnapshot();
    });
  });
});
