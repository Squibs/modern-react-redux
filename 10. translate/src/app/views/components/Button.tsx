import React from 'react';

import { LanguageContext, ColorContext } from '../../../context';

// helper functions to help clean up multiple consumer elements
const Button: React.FC = () => {
  const renderButton = (color: string) => {
    return (
      <button type="submit" className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {(value) => (value === 'english' ? 'Submit' : 'Voorleggen')}
        </LanguageContext.Consumer>
      </button>
    );
  };

  return (
    <>
      <ColorContext.Consumer>
        {(color) => renderButton(color)}
      </ColorContext.Consumer>
    </>
  );
};

export default Button;

// multiple consumer elements
/*
  const Button: React.FC = () => (
    <>
      <ColorContext.Consumer>
        {(color) => (
          <button type="submit" className={`ui button ${color}`}>
            <LanguageContext.Consumer>
              {(value) => (value === 'english' ? 'Submit' : 'Voorleggen')}
            </LanguageContext.Consumer>
          </button>
        )}
      </ColorContext.Consumer>
    </>
  );

  export default Button;
*/

// useContext hook
/*
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
*/

// access provider/default value via this.context
/*
  import LanguageContext from '../../../context';

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

// access provider/default value via consumer
/*
  import LanguageContext from '../../../context';

  class Button extends React.Component {
    render() {
      return (
        <button className="ui button primary">
          <LanguageContext.Consumer>
            {(value) => value === 'english' ? 'Submit' : 'Voorleggen'}
          </LanguageContext.Consumer>
        </button>
      );
    }
  }

  export default Button;
*/

// access provider/default value via consumer with helper function
/*
  import LanguageContext from '../../../context';

  class Button extends React.Component {
    renderSubmit(value) {
      return value === 'english' ? 'Submit' : 'Voorleggen';
    }

    render() {
      return (
        <button className="ui button primary">
          <LanguageContext.Consumer>
            {(value) => this.renderSubmit(value)}
          </LanguageContext.Consumer>
        </button>
      );
    }
  }

  export default Button;
*/
