import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../routes';
import { Header } from './components';

const App: React.FC = () => {
  return (
    <>
      {/* renders on every page as long as it is not wrapped inside of a route. Must be within BrowserRouter as it is rendering <Link /> elements */}
      <Header />

      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
      </Switch>
    </>
  );
};

export default App;
