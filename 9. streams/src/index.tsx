// client/index.tsx
import React from 'react';

import { render } from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
// importing Router now as we are using our 'own' router history object ./app/routes/history.ts
import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './app/views/App';
import configureStore from './app/state/store';
import { history } from './app/routes';

const reduxStore = configureStore();

render(
  <React.StrictMode>
    <ReduxProvider store={reduxStore}>
      <Router history={history}>
        <App />
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
  document.querySelector('#root') as HTMLElement,
);

// Single Page App (SPA, SPAs)
// Look up SEO for SPA
// ctrl + D for finding next of selection and adding a cursor as well
