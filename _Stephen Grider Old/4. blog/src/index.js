import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// BrowserRouter interacts with history library, decides what to do based on a change inside url.
// Route workhorse for react router, is a react component that can be rendered inside of any other
// react component; purpose being it can provide configuration based on url.

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

/* eslint-disable react/jsx-filename-extension */

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/posts/new" component={PostsNew} />
        <Route path="/posts/:id" component={PostsShow} />
        <Route path="/" component={PostsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'),
);
// BrowserRouter Switch loads the most specific route starting from the top
// When switch tries to render its children it will look through starting from the top
// that matches the current url;
// ':id' is a wildcard token for react-router -> order matter for this wildcard as well
// so if '/posts/:id' route was listed before the 'posts/new/' route and the user
// tried to navigate to '/posts/new' then the user would be taken to the route of
// '/posts/:id' instead because '/new' would be considered the wildcard of '/posts/:id'
