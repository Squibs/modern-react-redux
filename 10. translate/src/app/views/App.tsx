/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import { LanguageContext, ColorContext } from '../../context';
import { UserCreate } from './pages';

const App: React.FC = () => {
  const [language, setLanguage] = useState('english');

  const onLanguageChange = (chosenLanguage: string) => {
    setLanguage(chosenLanguage);
  };

  return (
    <div className="ui container">
      <div>
        Select a Language:
        <i className="flag us" onClick={() => onLanguageChange('english')} />
        <i className="flag nl" onClick={() => onLanguageChange('dutch')} />
      </div>

      {/* wrapping order doesn't matter */}
      <ColorContext.Provider value="yellow">
        <LanguageContext.Provider value={language}>
          <UserCreate />
        </LanguageContext.Provider>
      </ColorContext.Provider>
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
