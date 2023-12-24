import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  QuestionView,
  QuestionText,
  ResponseText,
  QuestionTitle,
  Ellipsis,
  QuestionFull
} from './styles';
import Modal from '../../UI/ModalSwipeCard';

const QuestionsCard = ({ Questions }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  }

  const ModalContent = (
    <>
      {Questions.map((question) => (
        <QuestionView key={question._id}>
          <QuestionText>{question.question.question}</QuestionText>
          <ResponseText>{question.answer}</ResponseText>
        </QuestionView>
      ))}
    </>
  );
  
  console.log(Questions);

  return (
    <>
      {modalVisible && (
        <Modal closeModal={closeModal} content={ModalContent} modalVisible={modalVisible} />
      )}
      <QuestionTitle>{t('Card.question')}</QuestionTitle>
      {Questions && Questions.length > 0 && (
        <>
          <QuestionView key={Questions[0]._id} numberOfLines={1} ellipsizeMode='tail'>
            <QuestionText>
              {Questions[0].question.question}
            </QuestionText>
            <ResponseText>
              {Questions[0].answer}
            </ResponseText>
            <QuestionFull onPress={() => setModalVisible(true)}>
              <Ellipsis>{t('Card.read_more')}</Ellipsis>
            </QuestionFull>
          </QuestionView>
        </>
      )}
    </>
  );
};

export default QuestionsCard;
