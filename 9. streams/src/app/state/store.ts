import { Action, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk, { ThunkAction } from 'redux-thunk';

import * as reducers from './ducks';

const rootReducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({});

const configureStore = (): Store =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

export default configureStore;

export type AppState = ReturnType<typeof rootReducer>;

// prettier-ignore
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

// ?debug_session=rAnDomStRinG append to end of url so that store/state is carried over page refresh
