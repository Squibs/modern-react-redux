import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';
import FakeConvert from './FakeConvert';

const options = [
  {
    label: 'Afrikaans',
    value: 'af',
  },
  {
    label: 'Arabic',
    value: 'ar',
  },
  {
    label: 'Hindi',
    value: 'hi',
  },
  {
    label: 'Dutch',
    value: 'nl',
  },
];

const Translate = (): JSX.Element => {
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState('');

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="TextToTranslate">
            Enter Text
            <input
              id="TextToTranslate"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </div>
      </div>
      <Dropdown
        label="Select a Language"
        selected={language}
        onSelectedChange={setLanguage}
        options={options}
      />
      <hr />
      <h3 className="ui header">Output</h3>
      <FakeConvert text={text} language={language} />
    </div>
  );
};

export default Translate;
