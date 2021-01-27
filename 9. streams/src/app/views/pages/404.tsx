import React from 'react';

// 404 page - does not actually send out a 400 status code, sends out 200. Soft 404 page.
const PageNotFound: React.FC = () => {
  return <div>404 - Page Not Found</div>;
};

export default PageNotFound;
