/* eslint-disable import/prefer-default-export */

/*  https://youtu.be/dZZxegovK9Q?t=960

    Thanks for this great tutorial!
    One question - I'm not really sure why you chose to use AppActions as the return type for each of the
    action creators - and not one of the more specific action types (eg. SetExpenseAction, EditExpenseAction etc.). 
    I mean, each of these action creators will always return a single action type - so why type it so appears that
    it can return any of the 4 AppActions types.
    Hope this makes sense..


    AppActions is an aggregation of all the action types. Typescript is able to infer the specific action type within
    the aggregation using the type parameter that you return (type: typeof EDIT_EXPENSE). Based on the type you use,
    Typescript knows which specific action type to choose in AppActions. Despite this, however, you are free to explicitly
    define the specific action type if you would like.

    I hope this helps!
*/

import { AppActions, SONG_SELECTED } from '../types/actions';
import { Song } from '../types/Song';

// action creator
export const selectSong = (song: Song): AppActions => {
  // return an action
  return {
    type: SONG_SELECTED,
    payload: song,
  };
};
