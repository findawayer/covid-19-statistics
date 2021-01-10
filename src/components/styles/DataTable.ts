import styled from '@emotion/styled';

import ChevronDown from '../svg/chevron-down.svg';

export const StyledTable = styled.table`
  position: relative;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

export const StyledCell = styled.td`
  padding: 0.75em 1em;
  border: double #ccc;
  border-width: 0 1px 1px 0;
  text-align: left;

  &:last-child {
    border-right-width: 0;
  }
`;

// Some browsers only support sticky on `th`, not on `thead`.
export const StyledHeadCell = styled(StyledCell)`
  position: sticky;
  top: 0;
  padding-top: 1em;
  padding-bottom: 1em;
  border-top-width: 1px;
  background-color: #eee;
  font-weight: 700;
  cursor: pointer;
`.withComponent('th');

type StyledSortIconProps = {
  isActive: boolean;
  isAscending: boolean;
};

export const StyledSortIcon = styled.i<StyledSortIconProps>`
  width: 1rem;
  height: 1rem;
  float: right;
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  background: url(${ChevronDown}) no-repeat center / 100% auto;
  ${({ isAscending }) => isAscending && `transform: rotate(-0.5turn);`}
`;
