import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MovieImage,
  MovieArea,
  MovieInfo,
  MovieTitle,
  MovieName 
} from './styles';

const MovieCard = ({MovieURL, Movie}) => {
  const {t} = useTranslation();

  return (
    <>
      <MovieTitle>{t('Card.movie')}</MovieTitle>
      <MovieArea>
        <MovieImage source={{uri: `${MovieURL}`}} resizeMode="cover" />
        <MovieInfo>
          <MovieName>{Movie}</MovieName>
        </MovieInfo>
      </MovieArea>
    </>
  );
};

export default MovieCard;
