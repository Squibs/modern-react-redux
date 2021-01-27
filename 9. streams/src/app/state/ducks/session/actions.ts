/* eslint-disable import/prefer-default-export */

import { SessionActions, SessionActionTypes } from './types';

const signIn = (userId: string | undefined): SessionActionTypes => ({
  type: SessionActions.SIGN_IN,
  payload: userId,
});

const signOut = (): SessionActionTypes => ({
  type: SessionActions.SIGN_OUT,
});

export { signIn, signOut };
