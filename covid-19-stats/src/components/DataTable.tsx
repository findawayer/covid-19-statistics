import type { FunctionComponent, MouseEvent, TouchEvent } from 'react';
import React from 'react';

import { formatValue } from '../utils';
import {
  StyledBody,
  StyledCell,
  StyledHead,
  StyledHeadCell,
  StyledTable
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
  columns
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
  handleColumnClick?: (
    sortKey: string
  ) => (event: MouseEvent | TouchEvent) => void;
}

const DataTable: FunctionComponent<DataTableProps> = ({
  data,
  columns,
  handleColumnClick
}) => {
  return (
    <StyledTable>
      <StyledHead>
        {columns.map(({ key, alias }) => (
          <StyledHeadCell
            key={key}
            onClick={handleColumnClick ? handleColumnClick(key) : undefined}
          >
            {alias ?? key}
          </StyledHeadCell>
        ))}
      </StyledHead>
      <StyledBody>
        {data &&
          data.map(item => (
            <DataTableRow key={item.country} item={item} columns={columns} />
          ))}
      </StyledBody>
    </StyledTable>
  );
};

export default DataTable;
