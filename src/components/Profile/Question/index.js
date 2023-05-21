import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {getStorage} from '../../../functions/storage';
import {getQuestionList, updateUser} from '../../../functions/api_request';

import Loading from '../../../components/loading';
import {Button, Text} from 'react-native';
import {
  InputView,
  QuestionView,
  ModalSelectorCustom,
  FieldInput,
  ValidButton,
  ValidButtonText,
} from './styles';

const Question = ({route, navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({questions: [{}, {}, {}]});
  const [status, setStatus] = useState({
    isCorrect: false,
    statusPrompt: '',
  });
  let index = 0;
  const [navButton, setNavButton] = useState(null);
  const [questionList, setquestionList] = useState([
    {key: index++, label: 'Question 1 ?'},
    {key: index++, label: 'Question 2 ?'},
    {key: index++, label: 'Question 3 ?'},
    {},
    {},
    {},
  ]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getStorage('user').then(fetchedUser => {
      if (
        fetchedUser.questions == undefined ||
        fetchedUser.questions.length != 3
      ) {
        fetchedUser.questions = [{}, {}, {}];
      }
      setUser(fetchedUser);
    });
    getQuestionList().then(data => {
      setquestionList(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (
      user.questions.length == 3 &&
      user.questions[0].question != undefined &&
      user.questions[1].question != undefined &&
      user.questions[2].question != undefined &&
      user.questions[0].answer != undefined &&
      user.questions[1].answer != undefined &&
      user.questions[2].answer != undefined &&
      user.questions[0].answer != '' &&
      user.questions[1].answer != '' &&
      user.questions[2].answer != ''
    ) {
      setStatus({
        isCorrect: true,
        statusPrompt: '',
      });
    } else {
      setStatus({
        isCorrect: false,
        statusPrompt: t('profile.fill'),
      });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <InputView>
      <QuestionView>
        <ModalSelectorCustom
          data={questionList}
          initValue={user.questions[0].question}
          onChange={option => {
            user.questions[0].question = option.label;
            setUser(user);
          }}
        />
        <FieldInput
          placeholder={t('profile.question_placeholder')}
          onChangeText={text => {
            user.questions[0].answer = text;
            setUser(user);
            updateUser(user);
          }}
          value={user.questions[0].answer}
        />
      </QuestionView>
      <QuestionView>
        <ModalSelectorCustom
          data={questionList}
          initValue={user.questions[1].question}
          onChange={option => {
            user.questions[1].question = option.label;
            setUser(user);
          }}
        />
        <FieldInput
          placeholder={t('profile.question_placeholder')}
          onChangeText={text => {
            user.questions[1].answer = text;
            setUser(user);
            updateUser(user);
          }}
          value={user.questions[1].answer}
        />
      </QuestionView>
      <QuestionView>
        <ModalSelectorCustom
          data={questionList}
          initValue={user.questions[2].question}
          onChange={option => {
            user.questions[2].question = option.label;
            setUser(user);
            updateUser(user);
          }}
        />
        <FieldInput
          placeholder={t('profile.question_placeholder')}
          onChangeText={text => {
            user.questions[2].answer = text;
            setUser(user);
          }}
          value={user.questions[2].answer}
        />
      </QuestionView>
      <ValidButton
        onPress={() => {
          updateUser(user).then(data => {
            if (data.status == 200) {
              navigation.navigate('EditProfile');
            }
          });
        }}>
        <ValidButtonText>{t('profile.question_save')}</ValidButtonText>
      </ValidButton>
    </InputView>
  );
};

export default Question;
