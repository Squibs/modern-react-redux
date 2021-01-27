import React, { Component } from 'react';

/* eslint-disable react/jsx-filename-extension */

// functional component example
// const SearchBar = () => (
//   <input />
// );

/* generally start off with functional component;
   then as you go along -> upgrade to class based component if you need to
   (when your component needs state) */

// class based component
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }

  render() {
    // onChange (https://reactjs.org/docs/dom-elements.html#onchange)
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchBar;
