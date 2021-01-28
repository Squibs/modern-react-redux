import _ from 'lodash';
import { combineReducers } from 'redux';
import { StreamsActionTypes, StreamsActions, StreamsState, StreamsStateAlternative } from './types';

// prettier-ignore
const streamsReducer = (state = <StreamsState | StreamsStateAlternative>{}, action: StreamsActionTypes) => {
  switch (action.type) {
    case StreamsActions.FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case StreamsActions.FETCH_STREAM:
    case StreamsActions.CREATE_STREAM:
    case StreamsActions.EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case StreamsActions.DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

const reducer = combineReducers({
  streams: streamsReducer,
});

export default reducer;
