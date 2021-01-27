import './VideoItem.css';
import React from 'react';

export interface IVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

interface IVideoItemProps {
  video: IVideo;
  onVideoSelect: (video: IVideo) => void;
}

const VideoItem = ({ video, onVideoSelect }: IVideoItemProps): JSX.Element => {
  // not needed, but should be here, so I added it
  if (video === undefined) {
    return <div>Waiting...</div>;
  }

  // role, tabIndex, and onKeyPress are all for accessibility

  return (
    <div
      className="video-item item"
      onClick={() => onVideoSelect(video)}
      role="link"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onVideoSelect(video);
        }
      }}>
      <img
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
