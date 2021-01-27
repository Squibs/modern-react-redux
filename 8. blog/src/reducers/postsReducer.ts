import { FetchPostsDispatchTypes, FETCH_POSTS, Posts } from '../actions';

const defaultState: Posts[] = [];

// prettier-ignore
export default (state = defaultState, action: FetchPostsDispatchTypes): Posts[] => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
};
