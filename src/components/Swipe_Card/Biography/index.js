import React from 'react';
import {
  Biography,
  BiographyText
} from './styles';

const BiographyCard = ({ User }) => {


  return (
    <Biography>
      <BiographyText>{User?.biographie}</BiographyText>
    </Biography>
  );

};

export default BiographyCard;
