/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

import React from 'react';
import { LanguageStore } from '../../store/context/LanguageContext';
import ColorContext from '../../store/context/ColorContext';
import { UserCreate, LanguageSelector } from './pages';

const App: React.FC = () => {
  return (
    <div className="ui container">
      <LanguageStore>
        <LanguageSelector />

        <ColorContext.Provider value="yellow">
          <UserCreate />
        </ColorContext.Provider>
      </LanguageStore>
    </div>
  );
};

export default App;

/*
import LanguageContext from '../../context';

class App extends React.Component {
  state = { language: 'english' };

  onLanguageChange = (language) => {
    this.setState({ language });
  };

  render() {
    return (
      <div className="ui container">
        <div>
          Select a language:
          <i className="flag us" onClick={() => this.onLanguageChange('english')} />
          <i className="flag nl" onClick={() => this.onLanguageChange('dutch')} />
        </div>
        <LanguageContext.Provider value={this.state.language}>
          <UserCreate />
        </LanguageContext.Provider>
      </div>
    );
  }
}

export default App;
*/
