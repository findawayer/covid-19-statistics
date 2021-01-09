import styled from '@emotion/styled';

export const StyledCovidStatHeader = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: space-between;
`;

export const StyledCovidStatTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export const StyledCovidStatBody = styled.div`
  position: relative;
  height: calc(100vh - 200px);
  overflow: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
