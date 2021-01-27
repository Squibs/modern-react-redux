import React, { useState } from 'react';

interface ISearchBarProps {
  onFormSubmit: (term: string) => void;
}

const SearchBar = ({ onFormSubmit }: ISearchBarProps): JSX.Element => {
  const [term, setTerm] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    onFormSubmit(term);
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onSubmit} className="ui form">
        <div className="field">
          <label htmlFor="videoSearchBar">
            Search For A Video
            <input
              type="text"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              id="videoSearchBar"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
