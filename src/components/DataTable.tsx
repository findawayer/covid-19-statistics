import type { FunctionComponent, MouseEvent, TouchEvent } from 'react';
import React from 'react';

import { formatValue } from '../utils';
import {
  StyledBody,
  StyledCell,
  StyledHead,
  StyledHeadCell,
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
    <>
      {columns.map(({ key }) => (
        <StyledCell key={key}>{formatValue(item[key])}</StyledCell>
      ))}
    </>
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
      <StyledHead>
        {columns.map(({ key, alias }) => (
          <StyledHeadCell
            key={key}
            className={
              key === sortKey ? `is-sort-key is-${sortDirection}` : undefined
            }
            onClick={handleColumnClick ? handleColumnClick(key) : undefined}
            data-testid={key}
          >
            {alias ?? key}
          </StyledHeadCell>
        ))}
      </StyledHead>
      <StyledBody>
        {data &&
          data.map(item => (
            <DataTableRow key={item[idKey]} item={item} columns={columns} />
          ))}
      </StyledBody>
    </StyledTable>
  );
};

export default DataTable;
