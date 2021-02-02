import React from 'react';
import { Button, Field } from '../components';

// has no knowledge of the props being passed to its child components
const UserCreate: React.FC = () => {
  return (
    <div className="ui form">
      <Field />
      <Button />
    </div>
  );
};

export default UserCreate;
