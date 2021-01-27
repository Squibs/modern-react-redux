/* eslint-disable camelcase */
/* eslint react/prop-types: 0 */
import React from 'react';

interface IImageListProps {
  images:{id:string, alt_description:string, urls:{regular:string;}}[];
}

const ImageList:React.FC<IImageListProps> = ({ images }) => {
  const imageJSX = images.map(({ id, urls, alt_description }) => (
    <img
      key={id}
      src={urls.regular}
      alt={alt_description}
    />
  ));
  return <div>{imageJSX}</div>;
};

export default ImageList;
