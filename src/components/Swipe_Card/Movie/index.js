import React from 'react';
import {
  MovieImage,
  MovieArea,
  MovieInfo,
  MovieTitle
} from './styles';

const MovieCard = ({ MovieURL, MovieName, MovieGenre}) => {
  return (
    <MovieArea>
      <MovieInfo>
        <MovieTitle>{MovieName}</MovieTitle>
        <MovieTitle>{MovieGenre}</MovieTitle>
      </MovieInfo>
      <MovieImage source={{uri: `${MovieURL}`}} resizeMode='contain'/>
    </MovieArea>
  );
};

export default MovieCard;
