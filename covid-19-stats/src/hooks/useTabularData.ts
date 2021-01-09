import type { ChangeEvent, MouseEvent, TouchEvent } from 'react';
import { useMemo, useState } from 'react';

import { isNumber } from '../utils';

type SortDirection = 'ascending' | 'descending';

type DataOptions = {
  /** Name of column to use for data filtering. */
  filterKey: string | null;
  /** Search keyword to filter data with. */
  filterKeyword: string | null;
  /** Name of column to use for data sorting. */
  sortKey: string | null;
  /** Direction of data sorting. */
  sortDirection: SortDirection;
};

const DEFAULT_SORT_DIRECTION: SortDirection = 'descending';

/** Tabular data */
export const useTabularData = (
  rowData: Record<string, TODO>[] | null,
  options: Partial<DataOptions> = {}
) => {
  const [dataOptions, setDataOptions] = useState<DataOptions>({
    filterKey: null,
    filterKeyword: null,
    sortKey: null,
    sortDirection: DEFAULT_SORT_DIRECTION,
    ...options
  });

  /** Processed table data (sorted, filtered and memoized.) */
  const processedData = useMemo(() => {
    // Data not yet provided because of network latency.
    if (!rowData) return null;
    // Create a copy of the raw data. // TODO: deep copy? we need it?
    let processed = [...rowData];
    // Filter data.
    // Faster process should be done first, as it reduces the data to process ahead of time.
    processed = filterData(processed, dataOptions);
    // Sort data.
    processed = sortData(processed, dataOptions);
    // Return the processed data.
    return processed;
  }, [dataOptions, rowData]);

  /** Sort data on clicking on column headings.  */
  const handleColumnClick = (sortKey: string) => (
    event: MouseEvent | TouchEvent
  ) => {
    // Just in case the heading is an interactive element, e.g. <a />
    event.preventDefault();

    setDataOptions(previousOptions => {
      if (previousOptions.sortKey === sortKey) {
        return {
          ...previousOptions,
          sortDirection: flipDirection(previousOptions.sortDirection)
        };
      }
      return {
        ...previousOptions,
        sortKey,
        sortDirection: DEFAULT_SORT_DIRECTION
      };
    });
  };

  /** Filter data on clicking on column headings. */
  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setDataOptions(previousOptions => ({
      ...previousOptions,
      filterKeyword: value || null
    }));
  };

  return {
    processedData,
    handleColumnClick,
    handleKeywordChange
  };
};

function flipDirection(direction: SortDirection): SortDirection {
  return direction === 'ascending' ? 'descending' : 'ascending';
}

function filterData<T extends Record<string, unknown>>(
  data: T[],
  options: Pick<DataOptions, 'filterKey' | 'filterKeyword'>
): T[] {
  const { filterKey, filterKeyword } = options;
  // Return the data as-is, if no filtering option is set.
  if (!filterKey || !filterKeyword) return data;
  // Filter items in data, that matches the search keyword. (case-insensitive)
  const pattern = new RegExp(filterKeyword, 'i');
  const matchesPattern = (value: unknown) => pattern.test(String(value));
  return data.filter(item => matchesPattern(item[filterKey]));
}

function sortData<T extends Record<string, unknown>>(
  data: T[],
  options: Pick<DataOptions, 'sortKey' | 'sortDirection'>
): T[] {
  const { sortKey, sortDirection } = options;
  // Return the data as-is, if no sort option is set.
  if (!sortKey) return data;

  const reverse = sortDirection === 'descending';

  return data.sort((a, z) => {
    const aValue = a[sortKey];
    const zValue = z[sortKey];

    return isNumber(aValue) && isNumber(zValue)
      ? compareNumericData(aValue, zValue, reverse)
      : compareNonNumericData(aValue, zValue, reverse);
  });
}

function compareNumericData(a: number, z: number, reverse = false) {
  return reverse ? z - a : a - z;
}

function compareNonNumericData(a: unknown, z: unknown, reverse = false) {
  return reverse
    ? String(z).localeCompare(String(a))
    : String(a).localeCompare(String(z));
}
