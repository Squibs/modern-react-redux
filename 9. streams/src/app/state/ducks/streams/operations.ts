/* eslint-disable import/prefer-default-export */
import { Dispatch } from 'redux';

import * as actions from './actions';
import { axiosApiRequest } from '../../utils';
import { StreamsState } from './types';

// prettier-ignore
const createStream = (formValues: StreamsState) => async (dispatch: Dispatch): Promise<void> => {
  const response = await axiosApiRequest.post('/streams', formValues);

  // response object has a lot of information about the response, but we only care about the data that was returned from the request
  dispatch(actions.createStream(response.data));
};

const fetchStreams = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await axiosApiRequest.get('/streams');

  dispatch(actions.fetchStreams(response.data));
};

const fetchStream = (streamId: number) => async (dispatch: Dispatch): Promise<void> => {
  const response = await axiosApiRequest.get(`/streams/${streamId}`);

  dispatch(actions.fetchStream(response.data));
};

// prettier-ignore
const editStream = (streamId: number, formValues: StreamsState) => async (dispatch: Dispatch): Promise<void> => {
  const response = await axiosApiRequest.put(`/streams/${streamId}`, formValues);

  dispatch(actions.editStream(response.data));
};

const deleteStream = (streamId: number) => async (dispatch: Dispatch): Promise<void> => {
  await axiosApiRequest.delete(`/streams/${streamId}`);

  dispatch(actions.deleteStream(streamId));
};

export { createStream, fetchStreams, fetchStream, editStream, deleteStream };

// probably move StreamCreateFormTypes to state/ducks/streams/types
// then import them on the StreamCreate page
