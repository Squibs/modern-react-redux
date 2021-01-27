import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/configureStore';
import SongList from './SongList';
import SongDetail from './SongDetail';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div className="ui container grid">
        <div className="ui row">
          <div className="column eight wide">
            <SongList />
          </div>
          <div className="column eight wide">
            <SongDetail />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
