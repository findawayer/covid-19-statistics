import type { FunctionComponent } from 'react';
import React from 'react';

import Dump from './components/Dump';
import { useFetch } from './hooks/useFetch';
import type { AllCountriesData } from './types/data';

const API_ALL_COUNTRY = 'https://covid19-api.com/country/all';

// TODO: throbber????
const App: FunctionComponent = () => {
  const { data, loading, error, called } = useFetch<AllCountriesData>(
    API_ALL_COUNTRY
  );
  console.log(data, loading, error, called);

  return (
    <div>
      <Dump data={data} />
    </div>
  );
};

export default App;
