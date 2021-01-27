// client/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/views/App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.querySelector('#root') as HTMLElement,
);

// Single Page App (SPA, SPAs)
// Look up SEO for SPA
