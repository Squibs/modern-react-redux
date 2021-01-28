import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

// requires GoogleAuth.tsx; not sure if this would be a good way to do things or not
// components are meant to be independent I think, but maybe it's okay

const Header: React.FC = () => {
  return (
    <header className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Stream
        </Link>
        <GoogleAuth />
      </div>
    </header>
  );
};

export default Header;
