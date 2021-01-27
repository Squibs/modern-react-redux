// import { combineReducers } from 'redux';
import { SongActionTypes, SONG_SELECTED } from '../types/actions';
import { Song } from '../types/Song';

// https://youtu.be/dZZxegovK9Q?t=1057

export const songsReducer = () => {
  return [
    { title: 'No Scrubs', duration: '4:05' },
    { title: 'Macarena', duration: '2:30' },
    { title: 'All Star', duration: '3:15' },
    { title: 'I Want it That Way', duration: '1:45' },
  ];
};

export const selectedSongReducer = (
  selectedSong: Song | null = null,
  action: SongActionTypes,
): Song | null => {
  if (action.type === SONG_SELECTED) {
    return action.payload;
  }

  return selectedSong;
};

// export default combineReducers({
//   songs: songsReducer,
//   selectedSong: selectedSongReducer,
// });
