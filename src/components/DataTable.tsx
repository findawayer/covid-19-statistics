import type { FunctionComponent, MouseEvent, TouchEvent } from 'react';
import React from 'react';

import { formatValue } from '../utils';
import {
  StyledCell,
  StyledHeadCell,
  StyledSortIcon,
  StyledTable,
} from './styles/DataTable';

type ColumnDefinition = {
  key: string;
  alias: string;
};

// Row --------------------

interface DataTableRowProps {
  item: TODO;
  columns: readonly ColumnDefinition[];
}

const DataTableRow: FunctionComponent<DataTableRowProps> = ({
  item,
  columns,
}) => {
  return (
    <tr>
      {columns.map(({ key }) => (
        <StyledCell key={key}>{formatValue(item[key])}</StyledCell>
      ))}
    </tr>
  );
};

// Table --------------------

interface DataTableProps {
  data: TODO[] | null;
  columns: readonly ColumnDefinition[];
  idKey: string;
  sortKey?: string | null;
  sortDirection?: 'ascending' | 'descending';
  handleColumnClick?: (
    sortKey: string,
  ) => (event: MouseEvent | TouchEvent) => void;
}

const DataTable: FunctionComponent<DataTableProps> = ({
  data,
  columns,
  idKey,
  sortKey,
  sortDirection,
  handleColumnClick,
}) => {
  return (
    <StyledTable>
      <thead data-testid="thead">
        <tr>
          {columns.map(({ key, alias }) => (
            <StyledHeadCell
              key={key}
              onClick={handleColumnClick ? handleColumnClick(key) : undefined}
              data-testid={key}
            >
              {alias ?? key}
              <StyledSortIcon
                isActive={key === sortKey}
                isAscending={sortDirection === 'ascending'}
              />
            </StyledHeadCell>
          ))}
        </tr>
      </thead>
      <tbody data-testid="tbody">
        {data &&
          data.map(item => (
            <DataTableRow key={item[idKey]} item={item} columns={columns} />
          ))}
      </tbody>
    </StyledTable>
  );
};

export default DataTable;
