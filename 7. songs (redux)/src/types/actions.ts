// https://www.youtube.com/watch?v=dZZxegovK9Q
// https://github.com/davidkariuki/redux-typescript-example

import { Song } from './Song';

export const SONG_SELECTED = 'SONG_SELECTED';

export interface SelectSongAction {
  type: typeof SONG_SELECTED;
  payload: Song;
}

// combine all song related actions
export type SongActionTypes = SelectSongAction;

// combine all actions together
export type AppActions = SongActionTypes;
