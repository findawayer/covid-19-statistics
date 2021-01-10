import styled from '@emotion/styled';

export const StyledSearch = styled.input`
  display: block;
  width: 15em;
  padding: 0.75em 1em;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: width 0.1s;

  &:focus {
    width: 25em;
    outline: 0;
    border-color: #000;
  }
`;
