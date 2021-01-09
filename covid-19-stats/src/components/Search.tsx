import type { ChangeEvent, FormEvent, FunctionComponent } from 'react';
import React, { useState } from 'react';

import { debounce } from '../utils/call-rate-limit';
import { StyledSearch } from './styles/Search';

interface SearchProps {
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const Search: FunctionComponent<SearchProps> = ({ handleChange }) => {
  // Search keyword
  const [keyword, setKeyword] = useState('');

  const handleKeywordInput = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setKeyword((event.target as HTMLInputElement).value);
  };

  return (
    <StyledSearch
      type="search"
      value={keyword}
      placeholder="국가로 검색"
      onInput={handleKeywordInput}
      onChange={debounce(handleChange, 300)}
    />
  );
};

export default Search;
