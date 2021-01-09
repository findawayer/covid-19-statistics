import styled from '@emotion/styled';

export const StyledTable = styled.div`
  position: relative;
`;

export const StyledCell = styled.div`
  padding: 0.75em 1em;
  border: solid #ccc;
  border-width: 0 0 1px 1px;
`;

export const StyledHeadCell = styled(StyledCell)`
  padding-top: 1em;
  padding-bottom: 1em;
  background-color: #eee;
  font-weight: 700;
  cursor: pointer;
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
