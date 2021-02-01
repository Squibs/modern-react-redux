import React, { useContext } from 'react';

import LanguageContext from '../../../context/LanguageContext';

const Button: React.FC = () => {
  const language = useContext(LanguageContext);

  const text = language === 'english' ? 'Submit' : 'Voorleggen';

  return (
    <>
      <button type="submit" className="ui button primary">
        {text}
      </button>
    </>
  );
};

export default Button;

/*
  class Button extends React.Component {
    static contextType = LanguageContext; // must be named contextType; nothing else. You are accessing a property

    render() {
      // console.log(this.context);
      const text = this.context === 'english' ? 'Submit' : 'Voorleggen';
      return <button className="ui button primary">{text}</button>
    }
  }

  export default Button;
*/
