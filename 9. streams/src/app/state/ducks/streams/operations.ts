/* eslint-disable import/prefer-default-export */
import * as actions from './actions';
import { axiosApiRequest } from '../../utils';
import { StreamsState } from './types';
import { history } from '../../../routes';

import type { AppThunk } from '../../store'; // import type to fix dependency cycle error

// prettier-ignore
const createStream = (formValues: StreamsState): AppThunk => async (dispatch, getState) => {
  const { userId } = getState().session.auth;
  const response = await axiosApiRequest.post('/streams', { ...formValues, userId });

  // response object has a lot of information about the response, but we only care about the data that was returned from the request
  dispatch(actions.createStream(response.data));

  // do some programmatic navigation to get the user back to the root route
  history.push('/');
};

const fetchStreams = (): AppThunk => async (dispatch) => {
  const response = await axiosApiRequest.get('/streams');

  dispatch(actions.fetchStreams(response.data));
};

const fetchStream = (streamId: number): AppThunk => async (dispatch) => {
  const response = await axiosApiRequest.get(`/streams/${streamId}`);

  dispatch(actions.fetchStream(response.data));
};

// prettier-ignore
const editStream = (streamId: number, formValues: StreamsState): AppThunk => async (dispatch) => {
  const response = await axiosApiRequest.patch(`/streams/${streamId}`, formValues);
  // PUT requests update ALL properties of a record. So if you don't pass back all the same properties, some will go missing.
  // PATCH updates SOME properties on a record.

  dispatch(actions.editStream(response.data));
  history.push('/'); // navigate back to root after editing
};

const deleteStream = (streamId: number): AppThunk => async (dispatch) => {
  await axiosApiRequest.delete(`/streams/${streamId}`);

  dispatch(actions.deleteStream(streamId));
};

export { createStream, fetchStreams, fetchStream, editStream, deleteStream };

// probably move StreamCreateFormTypes to state/ducks/streams/types
// then import them on the StreamCreate page
