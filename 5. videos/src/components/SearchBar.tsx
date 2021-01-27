import React from 'react';

interface ISearchBarProps {
  onFormSubmit: (term: string) => void;
}

interface ISearchBarState {
  term: string;
}

class SearchBar extends React.Component<ISearchBarProps> {
  state: ISearchBarState = { term: '' };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { onFormSubmit } = this.props;
    const { term } = this.state;

    onFormSubmit(term);
  };

  render(): JSX.Element {
    const { term } = this.state;

    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label htmlFor="videoSearchBar">
              Video Search
              <input
                type="text"
                value={term}
                onChange={this.onInputChange}
                id="videoSearchBar"
              />
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
