import React, { useCallback, useEffect, useState } from 'react';

const GoogleAuth: React.FC = () => {
  const [auth, setAuth] = useState<gapi.auth2.GoogleAuth>();
  const [isSignedIn, setIsSignedIn] = useState<boolean | null | undefined>(null); // prettier-ignore

  // making use of useCallback hook here, not sure why we don't just put this logic in the auth listener method
  // but here it is; only figured this out due to eslint warnings. Stephen Grider was using a class based
  // component and I was trying to see if I could do everything with a functional component and hooks
  const onAuthChange = useCallback(() => {
    setIsSignedIn(auth?.isSignedIn.get());
  }, [auth?.isSignedIn]);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENTID,
          scope: 'email',
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance());
          setIsSignedIn(auth?.isSignedIn.get());

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
          <button
            onClick={onSignOutClick}
            type="button"
            className="ui red google button"
          >
            <i className="google icon" />
            Sign Out
          </button> // show sign-out button if user is logged in
        );
      default:
        return (
          <button
            onClick={onSignInClick}
            type="button"
            className="ui green google button"
          >
            <i className="google icon" />
            Sign In with Google
          </button> // show sign-in button if user is logged out
        );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;

// developers.google.com/api-client-library/javascript/reference/referencedocs

// probably put this logic in state/middlewares later on and not have this be a component
