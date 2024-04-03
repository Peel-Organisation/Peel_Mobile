import React from 'react';

import {
  GifImage,
  GifArea
} from './styles';
const GifCard = ({ GifUrl }) => {
  return (
    <GifArea>
      <GifImage
        source={{ uri: `${GifUrl}` }}
        resizeMode='contain'
      />
    </GifArea>
  );
};

export default GifCard;
