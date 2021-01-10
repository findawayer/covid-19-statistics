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

    it('filters data when search field receives a value', async () => {
      const { getByPlaceholderText, queryByText } = render(<CovidStatistics />);
      // Enter search keyword
      const searchField = getByPlaceholderText('국가로 검색');
      userEvent.type(searchField, 'K');
      // Monglia - unmatches
      // South Korea - matches
      // Taiwan - unmatches
      await waitFor(() => expect(queryByText('Mongolia')).toBeNull());
      expect(queryByText('South Korea')).toBeInTheDocument();
      expect(queryByText('Taiwan')).toBeNull();
    });

    // it('sorts data when column heading is clicked', async () => {
    //   const { getByTestId, queryByText } = render(<CovidStatistics />);
    //   // Click country
    //   userEvent.click(getByTestId('country'));
    //   await waitFor(() => expect(queryByText('Taiwan')).toBeInTheDocument());
    // });
  });
});
