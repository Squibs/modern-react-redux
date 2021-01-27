import { combineReducers } from 'redux';

import ActiveBook from './reducer_active_book';
import BooksReducer from './reducer_books';

// reducer adds key to global application state called books
// value for this key is whatever is returned from the books reducer (array of books)
const rootReducer = combineReducers({
  activeBook: ActiveBook,
  books: BooksReducer,
});

export default rootReducer;
