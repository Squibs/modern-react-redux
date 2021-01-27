import React from 'react';

import VideoListItem from './video_list_item';

/* eslint-disable react/jsx-filename-extension */

const VideoList = (props) => {
  const videoItems = props.videos.map(video => (
    <VideoListItem
      onVideoSelect={props.onVideoSelect}
      key={video.etag}
      video={video}
    />
  ));

  return (
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );
};

export default VideoList;
