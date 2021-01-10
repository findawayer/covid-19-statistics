import type { ChangeEvent, FunctionComponent } from 'react';
import React from 'react';

import { debounce } from '../utils/call-rate-limit';
import { StyledSearch } from './styles/Search';

interface SearchProps {
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const Search: FunctionComponent<SearchProps> = ({ handleChange }) => {
  return (
    <StyledSearch
      type="search"
      placeholder="국가로 검색"
      onChange={debounce(handleChange)}
    />
  );
};

export default Search;
