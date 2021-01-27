import { FETCH_WEATHER } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      // returning new instance of state; don't modify state
      // state.push(action.payload.data); <- would modify state !! NO NO
      // state.concat([action.payload.data]); <- same thing as below
      return [action.payload.data, ...state];
    default:
      return state;
  }
}
