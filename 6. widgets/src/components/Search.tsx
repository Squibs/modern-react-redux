// cSpell:ignore pageid, wordcount, srsearch

import React, { useState, useEffect } from 'react';
import axios from 'axios';

type TWikipediaSearchResult = {
  ns: number;
  pageid: number;
  size: number;
  snippet: string;
  timestamp: string;
  title: string;
  wordcount: number;
};

const Search = (): JSX.Element => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState<TWikipediaSearchResult[]>([]);

  // when the user types term gets updated via onChange on the input
  // this will re-render everything, and since term was updated: the below useEffect
  // will run. This sets a timer that will run before it updates debouncedTerm to
  // what term is currently set to. If term changes again before that timer ends
  // then it will cancel the previous timer and start a new one before updating debouncedTerm
  // when finally the user stops typing, or delays long enough for the timer to end
  // debouncedTerm gets updated and the second useEffect runs since it is linked to
  // run whenever debouncedTerm gets updated. The second useEffect makes a call to the
  // wikipedia api, retrieves api results, and stores that information in the results state variable
  // AND since both useEffects always run initially when the component is displayed
  // the default term set in the term state variable will call an initial api call
  // and display results no matter what, so the screen isn't blank at the start

  // makes sure we aren't doing are searches immediately
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    // cancels timer set above if this useEffect runs again before the timer ends
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    /* three ways to use async code in useEffect
    //
    // making a temporary variable/helper function (searchWikipedia) and calling it immediately after
    // const searchWikipedia = async () => {
    //   await axios.get('request url');
    // };
    // searchWikipedia();
    //
    // same thing as the above, only without declaring a variable; very miniscule performance benefit
    // (async () => {
    //   await axios.get('request url');
    // })();
    //
    // use normal promises instead of async await
    // axios.get('request url').then((response) => {
    //   console.log(response.data);
    // });                                                           */

    const searchWikipedia = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };

    searchWikipedia(); // immediately call the method to send an api request
  }, [debouncedTerm]);

  const renderResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }} />
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="SearchInput">
            Enter Search Term
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="input"
              id="SearchInput"
            />
          </label>
        </div>
      </div>
      <div className="ui celled list">{renderResults}</div>
    </div>
  );
};

export default Search;
