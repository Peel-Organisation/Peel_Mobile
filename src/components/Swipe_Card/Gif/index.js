import React from 'react';

import {
  GifImage,
  GifArea
} from './styles';
const Gif_Card = ({ GifUrl }) => {

  return (
    <GifArea>
      <GifImage
        source={{ uri: `${GifUrl}` }}
        resizeMode="cover"
      />
    </GifArea>
  );
};

export default Gif_Card;
