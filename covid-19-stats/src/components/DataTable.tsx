import styled from '@emotion/styled';
import type { FunctionComponent, MouseEvent, TouchEvent } from 'react';
import React from 'react';

const StyledTable = styled.div`
  position: relative;
  max-height: 35em;
  overflow: auto;
`;

const StyledRowGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  box-sizing: border-box;
  background: #fff;
  border: solid currentColor;
  border-width: 1px 1px 0 0;
`;

const StyledHead = styled(StyledRowGroup)`
  position: sticky;
  top: 0;
`;

const StyledBody = styled(StyledRowGroup)`
  margin-top: -1px;
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
        <StyledCell key={key}>{item[key]}</StyledCell>
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
