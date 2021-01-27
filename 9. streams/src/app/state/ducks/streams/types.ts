/* eslint-disable import/prefer-default-export */

/* ----------- describing the shape of the streams slice of state ----------- */

export type StreamsState = {
  id: number;
  title: string;
  description: string;
};

/* ------------------------ streams constant strings ------------------------ */

export enum StreamsActions {
  CREATE_STREAM = 'streams/CREATE_STREAM',
  FETCH_STREAMS = 'streams/FETCH_STREAMS',
  FETCH_STREAM = 'streams/FETCH_STREAM',
  EDIT_STREAM = 'streams/EDIT_STREAM',
  DELETE_STREAM = 'streams/DELETE_STREAM',
}

/* -------------------------- streams action types -------------------------- */

interface CreateStreamAction {
  type: typeof StreamsActions.CREATE_STREAM;
  payload: StreamsState;
}

interface FetchStreamsAction {
  type: typeof StreamsActions.FETCH_STREAMS;
  payload: StreamsState[];
}

interface FetchStreamAction {
  type: typeof StreamsActions.FETCH_STREAM;
  payload: StreamsState;
}

interface EditStreamAction {
  type: typeof StreamsActions.EDIT_STREAM;
  payload: StreamsState;
}

interface DeleteStreamAction {
  type: typeof StreamsActions.DELETE_STREAM;
  payload: StreamsState['id'];
}

export type StreamsActionTypes =
  | CreateStreamAction
  | FetchStreamsAction
  | FetchStreamAction
  | DeleteStreamAction
  | EditStreamAction;
