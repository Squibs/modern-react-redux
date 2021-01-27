/* eslint-disable import/prefer-default-export */
// what can be dispatched from components

import * as actions from './actions';

// thunks

// simple actions
const { signIn, signOut } = actions;

export { signIn, signOut };
