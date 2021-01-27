import React from 'react';

import VideoItem, { IVideo } from './VideoItem';

interface IVideoListProps {
  videos: IVideo[];
  onVideoSelect: (video: IVideo) => void;
}

const VideoList = ({ videos, onVideoSelect }: IVideoListProps): JSX.Element => {
  const renderedList = videos.map((video) => (
    <VideoItem
      key={video.id.videoId}
      onVideoSelect={onVideoSelect}
      video={video}
    />
  ));

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default VideoList;
