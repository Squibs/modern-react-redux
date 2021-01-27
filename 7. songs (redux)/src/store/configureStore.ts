import { combineReducers, createStore } from 'redux';
import { songsReducer, selectedSongReducer } from '../reducers';

export const rootReducer = combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
