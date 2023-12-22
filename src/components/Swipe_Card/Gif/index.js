import React from 'react';

import {
  GifImage,
  GifArea
} from './styles';
const Gif_Card = ({ User }) => {

  return (
      <GifArea>
        <GifImage
          source={{uri: `${User}`}}
          resizeMode="cover"
        />
      </GifArea>
  );
};

export default Gif_Card;
