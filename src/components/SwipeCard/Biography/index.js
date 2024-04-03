import React, { useState }from 'react';
import { useTranslation } from 'react-i18next';
import {
  Biography,
  BiographyText,
  BiographyTitle,
  BiographyFull,
  Ellipsis,
  BiographyTextModal
} from './styles';
import Modal from '../../UI/ModalSwipeCard';

const BiographyCard = ({ Bio }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  }

  const ModalContent = (
    <BiographyTextModal>{Bio}</BiographyTextModal>
  );

  return (
    <>
      {modalVisible && (
        <Modal closeModal={closeModal} content={ModalContent} modalVisible={modalVisible} />
      )}
      <BiographyTitle>{t('Card.biography')}</BiographyTitle>
      <Biography>
        <BiographyText numberOfLines={3} ellipsizeMode='tail'>
          {Bio}
          <Ellipsis> ...</Ellipsis>  
        </BiographyText>
        <BiographyFull onPress={() => setModalVisible(true)}>
          <Ellipsis>{t('Card.read_more')}</Ellipsis>
        </BiographyFull>
      </Biography>
    </>
  );
};

export default BiographyCard;
