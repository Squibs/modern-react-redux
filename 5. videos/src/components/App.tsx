import React from 'react';

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import youtube from '../apis/youtube';

import { IVideo } from './VideoItem';

interface IAppState {
  videos: [];
  selectedVideo: IVideo | null;
}

class App extends React.Component<unknown, IAppState> {
  state: IAppState = { videos: [], selectedVideo: null };

  componentDidMount(): void {
    this.onTermSubmit('surfing');
  }

  onTermSubmit = async (term: string): Promise<void> => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  onVideoSelect = (video: IVideo): void => {
    this.setState({ selectedVideo: video });
  };

  render(): JSX.Element {
    const { videos, selectedVideo } = this.state;

    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList onVideoSelect={this.onVideoSelect} videos={videos} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
