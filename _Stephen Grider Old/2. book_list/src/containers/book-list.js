import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectBook } from '../actions/index';

/* eslint-disable react/jsx-filename-extension */

// a container is just a component that has direct access to the state that is produced by redux
class BookList extends Component {
  renderList() {
    return this.props.books.map(book => (
      <li
        key={book.title}
        onClick={() => this.props.selectBook(book)}
        className="list-group-item"
      >
        {book.title}
      </li>
    ));
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

// state being everything that is being handled by redux
// this function is the glue between react and redux
function mapStateToProps(state) {
  // whatever is returned will show up as props inside of BookList
  return {
    books: state.books,
  };
}

// anything returned from this function will end up as props on the BookList container
function mapDispatchToProps(dispatch) {
  // whenever selectBook is called, the result should be passed to all of our reducers
  return bindActionCreators({ selectBook }, dispatch); // selectBook: selectBook
}

// when making a container you don't export the class (BookList) you export the container
// connect takes a function and a component and produces a container
// a container is a component that is aware of the state that is contained by redux
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
// container needs to know about the new dispatch method, selectBook. Make it available as a prop
