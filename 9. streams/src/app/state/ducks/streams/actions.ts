/* eslint-disable import/prefer-default-export */
import { StreamsState, StreamsActions, StreamsActionTypes } from './types';

const createStream = (formValues: StreamsState): StreamsActionTypes => ({
  type: StreamsActions.CREATE_STREAM,
  payload: formValues,
});

const fetchStreams = (streamListMany: StreamsState[]): StreamsActionTypes => ({
  type: StreamsActions.FETCH_STREAMS,
  payload: streamListMany,
});

const fetchStream = (streamListOne: StreamsState): StreamsActionTypes => ({
  type: StreamsActions.FETCH_STREAM,
  payload: streamListOne,
});

const editStream = (updatedStreamInfo: StreamsState): StreamsActionTypes => ({
  type: StreamsActions.EDIT_STREAM,
  payload: updatedStreamInfo,
});

const deleteStream = (streamId: StreamsState['id']): StreamsActionTypes => ({
  type: StreamsActions.DELETE_STREAM,
  payload: streamId,
});

export { createStream, fetchStreams, fetchStream, editStream, deleteStream };
