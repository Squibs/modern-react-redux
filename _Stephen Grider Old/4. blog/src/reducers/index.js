import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // { reducer as formReducer } is setting an alias for 'reducer' from redux-form
// redux-form handles changes automatically:
// no longer have to do onChangeHandlers, setting the state, and setting the value on the input

import PostsReducer from './reducer_posts';

// redux-form uses our instance of our redux store to handle state being produced by the form

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer, // it is important to use the keyword 'form' for redux-form
});

export default rootReducer;
