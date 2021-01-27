/* eslint-disable import/prefer-default-export */
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

import { AppState } from '../reducers'; // would put the AppThunk type somewhere else to fix this; bottom of file

export const FETCH_POSTS = 'FETCH_POSTS';

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface FetchPosts {
  type: typeof FETCH_POSTS;
  payload: Posts[];
}

export type FetchPostsDispatchTypes = FetchPosts;

// prettier-ignore
export const fetchPosts = () => async (dispatch: Dispatch<FetchPostsDispatchTypes>): Promise<void> => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const FETCH_USER = 'FETCH_USER';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface FetchUser {
  type: typeof FETCH_USER;
  payload: User;
}

export type FetchUserDispatchTypes = FetchUser;

// ############## original
// prettier-ignore
// export const fetchUser = (id: number) => async (dispatch: Dispatch<FetchUserDispatchTypes>): Promise<void> => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: FETCH_USER, payload: response.data });
// };

// ############## memoized
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: FETCH_USER, payload: response.data });
// });

// // prettier-ignore
// export const fetchUser = (id: number) => (dispatch: Dispatch<FetchUserDispatchTypes>): Promise<void> => _fetchUser(id, dispatch);

// prettier-ignore
export const fetchUser = (id: number) => async (dispatch: Dispatch<FetchUserDispatchTypes>): Promise<void> => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: FETCH_USER, payload: response.data });
};

// ############## combined reducer
export const FETCH_POSTS_AND_USERS = 'FETCH_POSTS_AND_USERS';

export interface FetchPostsAndUsers {
  type: typeof FETCH_POSTS_AND_USERS;
}

// prettier-ignore
// export const fetchPostsAndUsers = () => async (dispatch: Dispatch<Dispatch<FetchPosts>>): Promise<void> => {
//   console.log('about to fetch posts');
//   await dispatch(fetchPosts()); // wait for fetchPosts
//   console.log('fetched posts!');
// };

export const fetchPostsAndUsers = (): AppThunk => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, 'userId'))
  // userIds.forEach(id => dispatch(fetchUser(id)));

  // same as the above commented out code; makes use of lodash chain
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();

  // we don't care about waiting for the user id's to be fetched with the await keyword as
  // we don't have any more code to run after this
};

// prettier-ignore
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>
