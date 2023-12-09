import React from 'react';
import { View } from 'react-native';
import {
  MovieImage
} from './styles';

const MovieCard = ({ User }) => {
  return (
    <View>
      <MovieImage
        source={{
          uri: `${User?.movie?.images?.poster_path}`,
        }}
      />
    </View>
  );
};

export default MovieCard;
