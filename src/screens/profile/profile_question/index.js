import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { UpdateButton } from '../../../components/Update_User';

import { getStorage } from '../../../functions/storage';
import { getQuestionList } from '../../../functions/api_request';
import { ModalSelectorCustom } from '../../../components/StyledComponents/Profile/General/ConditionText/Test';
import { CustomView } from '../../../components/StyledComponents/Profile/General/CustomView';
import { PageTitle } from '../../../components/StyledComponents/Profile/General/PageTitle';
import { FieldInput } from '../../../components/StyledComponents/Profile/General/FieldInput';
import { InputView } from '../../../components/StyledComponents/Profile/General/InputView';
import { ConditionText } from '../../../components/StyledComponents/Profile/General/ConditionText';
import {
  HeaderView,
  HeaderText,
} from '../../../components/StyledComponents/Profile/General/Header';
import { ContentView } from '../../../components/StyledComponents/Profile/General/ContentView';

import crashlytics from '@react-native-firebase/crashlytics';
import Loading from '../../../components/loading';

const QuestionProfil = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({ questions: [{}, {}, {}] });
  const [navButton, setNavButton] = useState(null);
  const [questionList, setquestionList] = useState([
    { key: 1, label: 'question 1 ?' },
    { key: 2, label: 'question 2 ?' },
    { key: 3, label: 'question 3 ?' },
  ]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getStorage('user')
      .then(fetchedUser => {
        if (
          fetchedUser.questions == undefined ||
          fetchedUser.questions.length != 3
        ) {
          fetchedUser.questions = [{}, {}, {}];
        }
        console.log('fetchedUser : ', fetchedUser.questions);
        setUser(fetchedUser);
      })
      .catch(error => {
        crashlytics().recordError(error);
      });

    getQuestionList()
      .then(data => {
        setquestionList(data);
        setLoading(false);
      })
      .catch(error => {
        crashlytics().recordError(error);
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
      setNavButton(
        <>
          <UpdateButton
            user={{ questions: user.questions }}
            prevPage="Profile8"
            nextPage="Auth"
            navigation={navigation}
          />
        </>,
      );
    } else {
      setNavButton(
        <>
          <ConditionText>{t('profile.fill')}</ConditionText>
          <UpdateButton
            user={{ questions: user.questions }}
            prevPage="Profile8"
            nextPage=""
            navigation={navigation}
          />
        </>,
      );
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <CustomView>
      <HeaderView>
        <HeaderText>{t('profile.title')}</HeaderText>
      </HeaderView>
      <ContentView>
        <PageTitle>{t('profile.question_title')}</PageTitle>
        <InputView>
          <View>
            <ModalSelectorCustom
              data={questionList}
              initValue={user?.questions[0]?.question?.question}
              onChange={option => {
                let newUser = user;
                newUser.questions[0].question = option.key;
                setUser(newUser);
              }}
            />
          </View>
          <View>
            <FieldInput
              value={user.questions[0]?.answer}
              onChangeText={text => {
                let newUser = { ...user };
                newUser.questions[0].answer = text;
                setUser(newUser);
              }}
              placeholder={t('profile.question_placeholder')}
            />
          </View>
        </InputView>

        <InputView>
          <View>
            <ModalSelectorCustom
              data={questionList}
              initValue={user?.questions[1]?.question?.question}
              onChange={option => {
                let newUser = user;
                newUser.questions[1].question = option.key;
                setUser(newUser);
              }}
            />
          </View>
          <View>
            <FieldInput
              value={user.questions[1]?.answer}
              onChangeText={text => {
                let newUser = { ...user };
                newUser.questions[1].answer = text;
                setUser(newUser);
              }}
              placeholder={t('profile.question_placeholder')}
            />
          </View>
        </InputView>

        <InputView>
          <View>
            <ModalSelectorCustom
              data={questionList}
              initValue={user?.questions[2]?.question?.question}
              onChange={option => {
                let newUser = user;
                newUser.questions[2].question = option.key;
                setUser(newUser);
              }}
            />
          </View>
          <View>
            <FieldInput
              value={user.questions[2]?.answer}
              onChangeText={text => {
                let newUser = { ...user };
                newUser.questions[2].answer = text;
                setUser(newUser);
              }}
              placeholder={t('profile.question_placeholder')}
            />
          </View>
        </InputView>
      </ContentView>
      {navButton}
    </CustomView>
  );
};

export default QuestionProfil;
