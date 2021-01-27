/* eslint-disable import/prefer-default-export */

/* ---------- describing the shape of the session's slice of state ---------- */

export type SessionState = {
  isSignedIn: boolean | null;
  userId: string | null | undefined;
};

/* ------------------------ session constant strings ------------------------ */

// const SIGN_IN = 'session/SIGN_IN';
// const SIGN_OUT = 'session/SIGN_OUT';

export enum SessionActions {
  SIGN_IN = 'session/SIGN_IN',
  SIGN_OUT = 'session/SIGN_OUT',
}

/* -------------------------- session action types -------------------------- */

interface SignInAction {
  type: typeof SessionActions.SIGN_IN;
  payload: string | null | undefined;
}

type SignOutAction = {
  type: typeof SessionActions.SIGN_OUT;
};

export type SessionActionTypes = SignInAction | SignOutAction;
