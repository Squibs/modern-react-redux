import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { AppState } from '../../state/store';
import { sessionOperations } from '../../state/ducks/session';

/* ------------------------------ Redux Config ------------------------------ */

const mapStateToProps = (state: AppState) => ({
  isSignedIn: state.session.auth.isSignedIn,
});

const mapDispatchToProps = {
  signIn: sessionOperations.signIn,
  signOut: sessionOperations.signOut,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/* ---------------------------------- Types --------------------------------- */

type PropsFromRedux = ConnectedProps<typeof connector>;

// interface MyProps {}

type Props = PropsFromRedux; // & MyProps

/* -------------------------------- Component ------------------------------- */

const GoogleAuth: React.FC<Props> = ({ signIn, signOut, isSignedIn }: Props) => {
  const [auth, setAuth] = useState<gapi.auth2.GoogleAuth>();
  // const [isSignedIn, setIsSignedIn] = useState<boolean | null | undefined>(null); // prettier-ignore

  // making use of useCallback hook here, not sure why we don't just put this logic in the auth listener method
  // but here it is; only figured this out due to eslint warnings. Stephen Grider was using a class based
  // component and I was trying to see if I could do everything with a functional component and hooks
  const onAuthChange = useCallback(
    (isUserSignedIn) => {
      if (isUserSignedIn) {
        signIn(auth?.currentUser.get().getId());
      } else if (isUserSignedIn === false) {
        // I put this check in, because isUserSignedIn is null initially and this would
        // cause an extra session/SIGN_OUT action to be called when the page is first initialized
        // it would go (when the page is refreshed when you are already signed in):
        // @@INIT -> session/SIGN_OUT -> session/SIGN_IN
        // or (if the user was already signed out):
        // @@INIT -> session/SIGN_OUT -> session/SING_OUT
        // and in stephen grider's video this wasn't happening, so by putting in this check
        // I think my app is working more like it should now
        signOut();
      }
    },
    [auth?.currentUser, signIn, signOut],
  );

  // componentDidMount
  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENTID,
          scope: 'email',
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance());

          onAuthChange(auth?.isSignedIn.get());

          // update signed in text
          auth?.isSignedIn.listen(onAuthChange);
        });
    });
  }, [auth?.isSignedIn, onAuthChange]);

  const onSignInClick = () => {
    auth?.signIn();
  };

  const onSignOutClick = () => {
    auth?.signOut();
  };

  const renderAuthButton = (): JSX.Element | null => {
    switch (isSignedIn) {
      case null:
        return null; // show nothing if determining login status
      case true:
        return (
          <button onClick={onSignOutClick} type="button" className="ui red google button">
            <i className="google icon" />
            Sign Out
          </button> // show sign-out button if user is logged in
        );
      default:
        return (
          <button onClick={onSignInClick} type="button" className="ui green google button">
            <i className="google icon" />
            Sign In with Google
          </button> // show sign-in button if user is logged out
        );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default connector(GoogleAuth);

// developers.google.com/api-client-library/javascript/reference/referencedocs

/*  local state -> this.state | this.setState || [state, setState] = useState();
    redux state -> only usable with mapStateToProps and connect (props.reduxState)
    redux dispatch/actions -> only usable with mapDispatchToProps and connect (props.reduxAction)
    passed down props from parent component -> type MyProps = {} | interface MyProps {} (props.parentState) */
