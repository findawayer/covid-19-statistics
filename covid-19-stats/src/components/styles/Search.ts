import styled from '@emotion/styled';

export const StyledSearch = styled.input`
  display: block;
  width: 15em;
  padding: 0.75em 1em;
  background: #fff;
  border: 1px solid #ccc;
  transition: width 0.1s;

  &:focus {
    width: 25em;
  }
`;
