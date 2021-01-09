import type { FunctionComponent } from 'react';
import React from 'react';

import DataTable from './components/DataTable';
import Throbber from './components/Throbber';

// import Dump from './components/Dump';
import { useFetch } from './hooks/useFetch';
import type { AllCountriesData } from './types/data';

const API_ALL_COUNTRY = 'https://covid19-api.com/country/all';

const columns = [
  { key: 'country', name: '국가' },
  { key: 'confirmed', name: '확진자' },
  { key: 'recovered', name: '완치자' },
  { key: 'critical', name: '치명적' },
  { key: 'deaths', name: '사망자' }
];

// TODO: throbber????
const App: FunctionComponent = () => {
  const { data, loading, error } = useFetch<AllCountriesData>(API_ALL_COUNTRY);

  if (loading) return <Throbber />;
  if (!data) return <p>No data!</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {/* <Dump data={data} /> */}
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default App;
