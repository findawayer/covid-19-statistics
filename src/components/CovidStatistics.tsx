import type { FunctionComponent } from 'react';
import React from 'react';

import { API_COVID_19_ALL_COUNTRY } from '../config/api';
import { useFetch } from '../hooks/useFetch';
import { useTabularData } from '../hooks/useTabularData';
import type { CountryData } from '../models/covid-19-api';
import DataTable from './DataTable';
import Loading from './Loading';
import Search from './Search';
import {
  StyledCovidStatBody,
  StyledCovidStatHeader,
  StyledCovidStatScroll,
  StyledCovidStatTitle,
} from './styles/CovidStatistics';

const columns = [
  { key: 'country', alias: '국가' },
  { key: 'confirmed', alias: '확진자' },
  { key: 'recovered', alias: '완치자' },
  { key: 'critical', alias: '치명적' },
  { key: 'deaths', alias: '사망자' },
];

const CovidStatTable: FunctionComponent = () => {
  const { data, loading, error } = useFetch<CountryData[]>(
    API_COVID_19_ALL_COUNTRY,
    { cacheKey: 'covid19-country-all', cacheMaxAge: 60 * 60 * 1000 }, // 1 hour cache
  );
  const {
    processedData,
    dataOptions: { sortKey, sortDirection },
    handleColumnClick,
    handleKeywordChange,
  } = useTabularData(data, {
    filterKey: 'country',
    sortKey: 'country',
    sortDirection: 'ascending',
  });

  const renderTable = () => {
    if (loading) return <Loading />;
    if (error) return <p>{error.message}</p>;
    if (!data) return <p>No data!</p>;
    return (
      <DataTable
        data={processedData}
        columns={columns}
        sortKey={sortKey}
        sortDirection={sortDirection}
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
      <StyledCovidStatBody>
        <StyledCovidStatScroll>{renderTable()}</StyledCovidStatScroll>
      </StyledCovidStatBody>
    </>
  );
};

export default CovidStatTable;
