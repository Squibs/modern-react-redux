import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import * as reducers from './ducks';

const rootReducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({});

const configureStore = (): Store =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

export default configureStore;

export type AppState = ReturnType<typeof rootReducer>;

// ?debug_session=rAnDomStRinG append to end of url so that store/state is carried over page refresh
