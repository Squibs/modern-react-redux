import { FetchUserDispatchTypes, FETCH_USER, User } from '../actions';

export default (state: User[] = [], action: FetchUserDispatchTypes): User[] => {
  switch (action.type) {
    case FETCH_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};
