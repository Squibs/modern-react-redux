import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
// don't need to specify further since we are importing form index.js file

// going to store posts in an object so default state to an object (state = {})
export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      // look at state object, if state has a key of the post id; just drop it
      // action.payload is set to the id in this case see src/actions/index.js
      return _.omit(state, action.payload);

      // // this is what we would have to do if our application level state was an array
      // // rather than an object
      // return _.reject(state, post => post.id === action.payload);
    case FETCH_POST:
      // ES5 EXAMPLE:
      // const post = action.payload.data;
      // // don't throw away previous posts fetched, via FETCH_POSTS; pull them from ...state
      // const newState = { ...state };
      // // take newState object and add additional property id and set equal to post
      // newState[post.id] = post;
      // return newState;

      // Do the same thing in ES6 using key-interpolation:
      // purpose of this is to add to the existing state which already contains posts
      // which was created when FETCH_POSTS was called.
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      // provide array to mapKeys function (the post data from the GET call), then use the existing
      // property 'id' from the array of objects and use that as the key for the post itself
      // for example `array = [{id: 4, title: "hi"}, {id:25, title:"bye"}];` would become:
      // { 4: {id: 4, title: "hi"}, 25: {id: 25, title: "bye"}}
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
