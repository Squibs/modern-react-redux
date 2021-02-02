/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

import React, { useContext } from 'react';
import LanguageContext from '../../../store/context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const languageCon = useContext(LanguageContext);

  return (
    <>
      Select a Language:
      <i
        className="flag us"
        onClick={() => languageCon.onLanguageChange('english')}
      />
      <i
        className="flag nl"
        onClick={() => languageCon.onLanguageChange('dutch')}
      />
    </>
  );
};

export default LanguageSelector;
