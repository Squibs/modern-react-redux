import { combineReducers } from 'redux';
import { SessionActions, SessionActionTypes, SessionState } from './types';

// hover SessionState for state shape; which is defined in ./types.ts
const initialState: SessionState = {
  isSignedIn: null,
  userId: null,
};

// prettier-ignore
const authReducer = (state = initialState, action: SessionActionTypes): SessionState => {
  switch (action.type) {
    case SessionActions.SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SessionActions.SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

const reducer = combineReducers({
  auth: authReducer,
});

export default reducer;
