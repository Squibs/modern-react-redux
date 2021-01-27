import { useState, useEffect } from 'react';
import youtube from '../apis/youtube';

// prettier-ignore
const useVideos = (defaultSearchTerm: string): readonly [never[], (term: string) => Promise<void>] => {
  const [videos, setVideos] = useState([]);

  const search = async (term: string): Promise<void> => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
      },
    });

    setVideos(response.data.items);
  };

  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]); 

  return [videos, search] as const;
};

export default useVideos;
