import React from 'react';

/* eslint-disable react/jsx-filename-extension */

// ({ video }) is equivalent to `const video = props.video;`
const VideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = video.snippet.thumbnails.default.url;
  const videoTitle = video.snippet.title;

  return (
    <li onClick={() => onVideoSelect(video)} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl} alt="" />
        </div>
        <div className="media-body">
          <div className="media-heading">{videoTitle}</div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
