import type { FunctionComponent } from 'react';
import React from 'react';

// import Dump from '../components/Dump';
import { useFetch } from '../hooks/useFetch';
import { useTabularData } from '../hooks/useTabularData';
import DataTable from './DataTable';
import Search from './Search';
import Throbber from './Throbber';

const API_ALL_COUNTRY = 'https://covid19-api.com/country/all';

type CountryData = {
  country: string;
  code: string;
  confirmed: number;
  recovered: number;
  critical: number;
  deaths: number;
  latitude: number;
  longitude: number;
  lastChange: string; // Date string
  lastUpdate: string; // Date string
};

const columns = [
  { key: 'country', alias: '국가' },
  { key: 'confirmed', alias: '확진자' },
  { key: 'recovered', alias: '완치자' },
  { key: 'critical', alias: '치명적' },
  { key: 'deaths', alias: '사망자' }
];

interface CovidStatTableProps {}

const CovidStatTable: FunctionComponent<CovidStatTableProps> = () => {
  const { data, loading, error } = useFetch<CountryData[]>(API_ALL_COUNTRY);
  const {
    processedData,
    handleColumnClick,
    handleKeywordChange
  } = useTabularData(data, { filterKey: 'country' });

  if (loading) return <Throbber />;
  if (!data) return <p>No data!</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <div>
        <Search handleChange={handleKeywordChange} />
      </div>
      <DataTable
        data={processedData}
        columns={columns}
        handleColumnClick={handleColumnClick}
      />
    </div>
  );
};

export default CovidStatTable;
