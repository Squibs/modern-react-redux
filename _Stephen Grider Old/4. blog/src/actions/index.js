import axios from 'axios';
// axios for network requests inside action creator
// redux-promise to handle asynchronous nature of request (in src/index.js)

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=Squibs';

// I want to point to myself, if I ever read these notes I've made again to
// https://daveceddia.com/what-is-a-thunk/
// returning a function rather than an action object in an action creator

// this is an action creator
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  // this is an action object;
  // redux-promise intercepts the request and gets desired results for reducer
  return {
    type: FETCH_POSTS,
    payload: request,
  };
}

// has a callback, from onSubmit() inside of the component src/components/posts_new.js
export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts/${API_KEY}`, values)
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request,
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request,
  };
}

// callback for what happens after the post is deleted
export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);
  request.then(() => callback());

  // unlike the previous actions, this one doesn't really need access to the post anymore
  // in the reducer. We just need to make sure the post is removed from our application level state.
  // we should return the id of the post we are deleting. then in the reducer we can just delete
  // and get rid of the particular post.
  return {
    type: DELETE_POST,
    payload: id,
  };
}
