import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MusicImage,
  MusicArea,
  MusicInfo,
  MusicName,
  MusicArtist,
  MusicTitle
} from './styles';

const MusicCard = ({ MusicURL, MTitle, MArtist}) => {
const { t } = useTranslation();

  return (
    <>
      <MusicTitle>{t('Card.music')}</MusicTitle>
      <MusicArea>
        <MusicImage source={{uri: `${MusicURL}`}} resizeMode="cover"/>
        <MusicInfo>
          <MusicName>{MTitle}</MusicName>
          <MusicArtist>{MArtist}</MusicArtist>
        </MusicInfo>
      </MusicArea>
    </>
  );
};

export default MusicCard;
