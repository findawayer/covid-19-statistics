import styled from '@emotion/styled';

export const StyledCovidStatHeader = styled.div`
  height: 4rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledCovidStatTitle = styled.h1`
  margin: 0;
  flex: 1 1 auto;
  font-size: 2rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledCovidStatBody = styled.div`
  height: calc(100vh - 8rem);
  overflow: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const StyledCovidStatScroll = styled.div`
  position: relative;
  min-width: 50em;
  height: 100%;
`;
