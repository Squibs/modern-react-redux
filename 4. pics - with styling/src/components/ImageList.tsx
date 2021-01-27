/* eslint-disable camelcase */
/* eslint react/prop-types: 0 */

import './ImageList.css';

import React from 'react';

import ImageCard from './ImageCard';

interface IImageListProps {
  images: { id: string; alt_description: string; urls: { regular: string } }[];
}

const ImageList: React.FC<IImageListProps> = ({ images }) => {
  const imageJSX = images.map((image) => (
    <ImageCard key={image.id} image={image} />
  ));

  return <div className="image-list">{imageJSX}</div>;
};

export default ImageList;
