import React from 'react';
import {
  GifImage
} from './styles';

const Gif_Card = ({ User }) => {

  return (
    <GifImage
      source={{
        uri: `${User?.gif?.image?.webp}`,
      }}
    />
  );
};

export default Gif_Card;
