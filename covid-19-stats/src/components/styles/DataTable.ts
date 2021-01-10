import styled from '@emotion/styled';

import ChevronDown from '../svg/chevron-down.svg';

export const StyledTable = styled.div`
  position: relative;
  min-width: 40em;
`;

export const StyledCell = styled.div`
  padding: 0.75em 1em;
  border: solid #ccc;
  border-width: 0 0 1px 1px;
`;

export const StyledHeadCell = styled(StyledCell)`
  position: relative;
  padding-top: 1em;
  padding-bottom: 1em;
  background-color: #eee;
  font-weight: 700;
  cursor: pointer;

  &.is-sort-key::after {
    content: '';
    position: absolute;
    top: 0;
    right: 1em;
    bottom: 0;
    display: block;
    width: 1rem;
    height: 1rem;
    margin: auto;
    background: url(${ChevronDown}) no-repeat center / 100% auto;
  }

  &.is-ascending::after {
    transform: rotate(-0.5turn);
  }
`;

export const StyledRowGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  box-sizing: border-box;
  background: #fff;
  border: solid #ccc;
  border-width: 1px 1px 0 0;
`;

export const StyledHead = styled(StyledRowGroup)`
  position: sticky;
  top: 0;
`;

export const StyledBody = styled(StyledRowGroup)`
  margin-top: -1px;
`;
