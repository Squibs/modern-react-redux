import React, { useState, useEffect } from 'react';

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import useVideos from '../hooks/useVideos';

import { IVideo } from './VideoItem';

interface IAppState {
  selectedVideo: IVideo | null;
}

const App = (): JSX.Element => {
  const [selectedVideo, setSelectedVideo] = useState<IAppState['selectedVideo']>(null); // prettier-ignore
  const [videos, search] = useVideos('buildings');

  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);

  return (
    <div className="ui container">
      <SearchBar onFormSubmit={search} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList
              // onVideoSelect={(video) => setSelectedVideo(video)}
              // the above is the exact same as what this is doing
              onVideoSelect={setSelectedVideo}
              videos={videos}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
