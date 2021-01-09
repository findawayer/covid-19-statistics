import styled from '@emotion/styled';
import type { FunctionComponent, MouseEvent, TouchEvent } from 'react';
import React from 'react';

import { useSortableTable } from '../hooks/useSortableTable';

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border: solid currentColor;
  border-width: 1px 1px 0 0;
`;

const StyledCell = styled.div`
  padding: 1em;
  border: solid currentColor;
  border-width: 0 0 1px 1px;
`;

const StyledHeadCell = styled(StyledCell)`
  font-weight: 500;
  cursor: pointer;
`;

type ColumnDefinition = {
  key: string;
  name: string;
};

interface DataTableHeadingProps {
  columns: readonly ColumnDefinition[];
  handleClick: (key: string) => (event: MouseEvent | TouchEvent) => void;
}

const DataTableHeading: FunctionComponent<DataTableHeadingProps> = ({
  columns,
  handleClick
}) => {
  return (
    <>
      {columns.map(({ key, name }) => (
        <StyledHeadCell key={key} onClick={handleClick(key)}>
          {name}
        </StyledHeadCell>
      ))}
    </>
  );
};

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
        <StyledCell key={key}>{item[key]}</StyledCell>
      ))}
    </>
  );
};

interface DataTableProps {
  data: TODO[];
  columns: readonly ColumnDefinition[];
}

const DataTable: FunctionComponent<DataTableProps> = ({ data, columns }) => {
  const { sortedData, handleColumnClick } = useSortableTable(data);

  return (
    <StyledTable>
      <DataTableHeading columns={columns} handleClick={handleColumnClick} />
      {sortedData.map(item => (
        <DataTableRow key={item.country} item={item} columns={columns} />
      ))}
    </StyledTable>
  );
};

export default DataTable;
