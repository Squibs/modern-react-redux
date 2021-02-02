/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useContext } from 'react';
import LanguageContext from '../../../store/context/LanguageContext';

const Field: React.FC = () => {
  const languageCon = useContext(LanguageContext);

  const text = languageCon.language === 'english' ? 'Name' : 'Naam';

  return (
    <div className="ui field">
      <label>
        {text}
        <input />
      </label>
    </div>
  );
};

export default Field;
