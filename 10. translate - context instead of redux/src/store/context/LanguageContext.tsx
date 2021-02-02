import React, { useState } from 'react';

// type LanguageState = {
//   language: string;
//   onLanguageChange: (lang: string) => void;
// };

// i guess you would define state here instead of any
const Context = React.createContext<any>('english');

// eslint-disable-next-line react/prop-types
export const LanguageStore: React.FC = ({ children }) => {
  const [language, setLanguage] = useState('english');

  const onLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  console.log(Context);

  return (
    <Context.Provider value={{ language, onLanguageChange }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
