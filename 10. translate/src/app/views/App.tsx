/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
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
      <UserCreate />
    </div>
  );
};

export default App;
