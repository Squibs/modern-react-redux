import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APIKEY = process.env.REACT_APP_GTRANSLATE;

interface IConvertProps {
  text: string;
  language: {
    label: string;
    value: string;
  };
}

const Convert = ({ language, text }: IConvertProps): JSX.Element => {
  const [translated, setTranslated] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {}, // this is a post request and we are not using this part
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: APIKEY,
          },
        },
      );

      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, debouncedText]);

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;
