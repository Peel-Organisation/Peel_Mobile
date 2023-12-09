import React from 'react';

import { View } from 'react-native';
import {
  QuestionView,
  QuestionText,
  ResponseText
} from './styles';

const QuestionsCard = ({ User }) => {
  return (
    <View>
      <QuestionView>
        {User?.questions?.map(question => {
          return (
            <View key={question._id}>
              <View>
                <QuestionText>{question.question?.question}</QuestionText>
              </View>
              <View>
                <ResponseText>{question.answer}</ResponseText>
              </View>
            </View>
          );
        })}
      </QuestionView>
    </View>
  );
};

export default QuestionsCard;
