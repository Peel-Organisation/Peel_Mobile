import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InterestBox,
  InterestView,
  InterestTitle,
  InterestText
} from './styles';

const InterestsCard = ({ User }) => {
  const { t } = useTranslation();
  return (
    <>
      <InterestTitle>{t('Card.interest')}</InterestTitle>
      <InterestView>
        {User?.interests?.map(interest => {
          return (
            <InterestBox key={interest._id}>
              {/* //TODO: Fix the interest object save and display name here with "interest.name" */}
              <InterestText>Test</InterestText>
            </InterestBox>
          );
        })}
      </InterestView>
    </>
  );
};

export default InterestsCard;
