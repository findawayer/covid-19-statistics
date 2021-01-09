import type { ChangeEvent, FormEvent, FunctionComponent } from 'react';
import React, { useState } from 'react';

import { debounce } from '../utils/call-rate-limit';

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
    <div>
      <input
        type="search"
        value={keyword}
        onInput={handleKeywordInput}
        onChange={debounce(handleChange, 300)}
      />
    </div>
  );
};

export default Search;
