import type { MouseEvent, TouchEvent } from 'react';
import { useMemo, useState } from 'react';

type SortDirection = 'ascending' | 'descending';

type SortOptions = {
  key: string | null;
  direction: SortDirection;
};

/**
 * Sort table data (memoized) on click event onto column headings.
 */
export const useSortableTable = (data: readonly Record<string, TODO>[]) => {
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    key: null,
    direction: 'ascending'
  });

  const sortedData = useMemo(() => {
    const sortKey = sortOptions.key;
    const isAscending = sortOptions.direction === 'ascending';
    // Unsorted.
    if (!sortKey) return data;
    // Return the data sorted.
    return [...data].sort((a, z) => {
      if (a[sortKey] < z[sortKey]) {
        return isAscending ? -1 : 1;
      }
      if (a[sortKey] > z[sortKey]) {
        return isAscending ? -1 : 1;
      }
      return 0;
    });
  }, [data, sortOptions]);

  const handleColumnClick = (key: string) => (
    event: MouseEvent | TouchEvent
  ) => {
    // Just in case the heading is an interactive element, e.g. <a />
    event.preventDefault();

    setSortOptions(previousOptions => {
      if (previousOptions.key === key) {
        return {
          key,
          direction: flipDirection(previousOptions.direction)
        };
      }
      return {
        key,
        direction: 'descending'
      };
    });
  };

  return {
    sortedData,
    handleColumnClick
  };
};

function flipDirection(direction: SortDirection): SortDirection {
  return direction === 'ascending' ? 'descending' : 'ascending';
}
