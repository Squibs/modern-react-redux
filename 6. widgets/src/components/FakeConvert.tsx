import React from 'react';

interface IConvertProps {
  text: string;
  language: {
    label: string;
    value: string;
  };
}

const FakeConvert = ({ language, text }: IConvertProps): JSX.Element => {
  return (
    <div>
      <h1>
        Sorry this translation is not going to work. Google translate is not
        free, but just imagine your text being translated here via Google
        translate API.
      </h1>
      <p>
        You entered: {text}
        <br />
        <br />
        To translate into {language.label}.
      </p>
    </div>
  );
};

export default FakeConvert;
