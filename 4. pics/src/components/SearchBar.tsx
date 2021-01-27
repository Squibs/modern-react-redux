import React from 'react';

interface ISearchBarProps {
  onSubmit:(term: string) => void;
}

interface ISearchBarState {
  term:string;
}

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  state = { term: '' };

  // (event) is the function here so I have to say what that is returning
  // and not onFormSubmit (e.g. onFormSubmit:any - no, (event):any - yes)
  // https://www.udemy.com/course/react-redux/learn/lecture/12531284#overview
  onFormSubmit = (event:React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault(); // has to be the very first thing, otherwise it will refresh still

    // need to bind this, otherwise cannot read property 'state' of undefined
    const { term } = this.state;
    const { onSubmit } = this.props;

    onSubmit(term);
  }

  render():JSX.Element {
    const { term } = this.state;

    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label htmlFor="textInput">
              Image Search
              <input
                id="textInput"
                type="text"
                value={term}
                onChange={(e) => this.setState({ term: e.target.value })}
              />
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
