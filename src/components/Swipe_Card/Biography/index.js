import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Biography,
  BiographyText,
  BiographyTitle,
  Ellipsis
} from './styles';

const BiographyCard = ({ Bio }) => {
  const { t } = useTranslation();
  
  return (
    <>
      <BiographyTitle>{t('Card.biography')}</BiographyTitle>
      <Biography>
        <BiographyText numberOfLines={3} ellipsizeMode='tail'>
          {Bio}
          <Ellipsis> ...</Ellipsis>  
        </BiographyText>
      </Biography>
    </>
  );
};

export default BiographyCard;
