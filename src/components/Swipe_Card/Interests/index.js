import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  InterestBox,
  InterestView,
  InterestTitle,
  InterestText,
  Ellipsis,
  InterestFull,
  InterestBoxFull,
  InterestTextFull
} from './styles';
import Modal from '../../UI/ModalSwipeCard';

const InterestsCard = ({ User }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  }

  const displayedInterests = User?.interests?.slice(0, 3);

  const ModalContent = (
    <>
      {User?.interests?.map(interest => {
        return (
          <InterestBoxFull key={interest._id}>
            <InterestTextFull>{interest.name}</InterestTextFull>
          </InterestBoxFull>
        );
      }
      )}
    </>
  );

  return (
    <>
      {modalVisible && (
        <Modal closeModal={closeModal} content={ModalContent} modalVisible={modalVisible} />
      )}
      <InterestTitle>{t('Card.interest')}</InterestTitle>
      <InterestView>
        {displayedInterests?.map((interest) => (
          <InterestBox key={interest._id}>
            <InterestText>{interest.name}</InterestText>
          </InterestBox>
        ))}
        <InterestFull onPress={() => setModalVisible(true)}>
            <Ellipsis>{t('Card.see_more')}</Ellipsis>
        </InterestFull>
      </InterestView>
    </>
  );
};

export default InterestsCard;
