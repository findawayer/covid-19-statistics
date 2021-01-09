import type { FunctionComponent } from 'react';
import React from 'react';

import { useFetch } from '../hooks/useFetch';
import { useTabularData } from '../hooks/useTabularData';
import DataTable from './DataTable';
import Loading from './Loading';
import Search from './Search';
import {
  StyledCovidStatHeader,
  StyledCovidStatTitle,
  StyledCovidStatBody
} from './styles/CovidStatistics';

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

const CovidStatTable: FunctionComponent = () => {
  const { data, loading, error } = useFetch<CountryData[]>(
    API_ALL_COUNTRY,
    { cacheKey: 'covid19-country-all', cacheMaxAge: 60 * 60 * 1000 } // 1 hour cache
  );
  const {
    processedData,
    handleColumnClick,
    handleKeywordChange
  } = useTabularData(data, {
    filterKey: 'country',
    sortKey: 'country',
    sortDirection: 'ascending'
  });

  const renderTable = () => {
    if (loading) return <Loading isCentered />;
    if (error) return <p>{error.message}</p>;
    if (!data) return <p>No data!</p>;
    return (
      <DataTable
        data={processedData}
        columns={columns}
        handleColumnClick={handleColumnClick}
      />
    );
  };

  return (
    <>
      <StyledCovidStatHeader>
        <StyledCovidStatTitle>코로나 바이러스 세계 현황</StyledCovidStatTitle>
        <Search handleChange={handleKeywordChange} />
      </StyledCovidStatHeader>
      <StyledCovidStatBody>{renderTable()}</StyledCovidStatBody>
    </>
  );
};

export default CovidStatTable;
