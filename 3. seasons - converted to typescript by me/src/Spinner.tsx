/* eslint-disable react/prop-types */

import React from 'react';

interface ISpinnerProps {
  message: string,
}

const Spinner:React.FC<ISpinnerProps> = ({ message }) => (
  <div className="ui active dimmer">
    <div className="ui big text loader">
      {message}
    </div>
  </div>
);

Spinner.defaultProps = {
  message: 'Loading...',
};

export default Spinner;
