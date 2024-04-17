import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import crashlytics from '@react-native-firebase/crashlytics';
import {getStorage} from '../../../functions/storage';
import {getQuestionList} from '../../../functions/api_request';

import {
  HeaderView,
  HeaderText,
  HeaderTextView,
  BarStyle,
  GoBackArrow,
  GoBackArrowImage,
} from '../styles/header.js';

import {
  CustomView,
  ContentView,
  PageTitle,
  ModalSelectorQuestion,
  LittleSpacer,
  QuestionFieldInput
} from '../styles/content.js';
import {Spacer} from '../../login/styles/index.js';
import settings from '../../../../assets/images/icons/settings-white.png';

import {ConditionText} from '../../../components/StyledComponents/Profile/General/ConditionText';

import Loading from '../../../components/Loading';
import {UpdateButton} from '../../../components/UpdateUser';
import StatusBarCustom from '../../../components/UI/StatusBarCustom/index.js';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QuestionProfil = ({route, navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({questions: [{}, {}, {}]});
  const [navButton, setNavButton] = useState(null);
  const [questionList, setquestionList] = useState([
    {key: 1, label: 'question 1 ?'},
    {key: 2, label: 'question 2 ?'},
    {key: 3, label: 'question 3 ?'},
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
        <UpdateButton
          user={{questions: user.questions}}
          prevPage="Profile8"
          nextPage="Auth"
          navigation={navigation}
        />,
      );
    } else {
      setNavButton(
        <>
          <ConditionText>{t('profile.fill')}</ConditionText>
          <UpdateButton
            user={{questions: user.questions}}
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
    <>
      <View style={{ backgroundColor: '#FC912F'}}>
        <SafeAreaView>
          <StatusBarCustom backgroundColor="#FC912F" theme="light-content" />
        </SafeAreaView>
      </View>
      <CustomView>
        <HeaderView>
          <GoBackArrow onPress={() => navigation.navigate('Settings')}>
            <GoBackArrowImage source={settings} />
          </GoBackArrow>
          <HeaderTextView>
            <HeaderText>{t('profile.title')}</HeaderText>
            <BarStyle />
          </HeaderTextView>
        </HeaderView>
        <Spacer />
        <PageTitle>{t('profile.question_choice')}</PageTitle>
        <LittleSpacer />
        <ContentView>
          <LittleSpacer />
          <ModalSelectorQuestion
            data={questionList}
            initValue={user?.questions[0]?.question?.question}
            onChange={option => {
              let newUser = user;
              newUser.questions[0].question = option.key;
              setUser(newUser);
            }}
            cancelText={t('Filter.cancel')}
            overlayStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
            initValueTextStyle={{color: '#3a3a3a', fontSize: 15, letterSpacing: 1}}
            selectStyle={{
              backgroundColor: '#ffdcae',
              width: '90%',
              alignSelf: 'center',
              borderWidth: 0,
              borderRadius: 10,
              padding: 10,
            }}
            selectTextStyle={{
              color: '#000000',
              fontSize: 15,
              letterSpacing: 0.5,
            }}
            optionTextStyle={{
              color: '#000000',
              fontSize: 15,
              letterSpacing: 0.5,
            }}
            selectedItemTextStyle={{
              color: '#FC912F',
              fontSize: 15,
              fontWeight: 'bold',
              letterSpacing: 0.5,
            }}
          />
          <QuestionFieldInput
            value={user.questions[0]?.answer}
            onChangeText={text => {
              let newUser = {...user};
              newUser.questions[0].answer = text;
              setUser(newUser);
            }}
            placeholder={t('profile.question_placeholder')}
          />

          <LittleSpacer />

          <ModalSelectorQuestion
            data={questionList}
            initValue={user?.questions[1]?.question?.question}
            onChange={option => {
              let newUser = user;
              newUser.questions[1].question = option.key;
              setUser(newUser);
            }}
            cancelText={t('Filter.cancel')}
            overlayStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
            initValueTextStyle={{color: '#3a3a3a', fontSize: 15, letterSpacing: 1}}
            selectStyle={{
              backgroundColor: '#ffdcae',
              width: '90%',
              alignSelf: 'center',
              borderWidth: 0,
              borderRadius: 10,
              padding: 10,
            }}
            selectTextStyle={{
              color: '#000000',
              fontSize: 15,
              letterSpacing: 0.5,
            }}
            optionTextStyle={{
              color: '#000000',
              fontSize: 15,
              letterSpacing: 0.5,
            }}
            selectedItemTextStyle={{
              color: '#FC912F',
              fontSize: 15,
              fontWeight: 'bold',
              letterSpacing: 0.5,
            }}
          />

          <QuestionFieldInput
            value={user.questions[1]?.answer}
            onChangeText={text => {
              let newUser = {...user};
              newUser.questions[1].answer = text;
              setUser(newUser);
            }}
            placeholder={t('profile.question_placeholder')}
          />

          <LittleSpacer />

          <ModalSelectorQuestion
            data={questionList}
            initValue={user?.questions[2]?.question?.question}
            onChange={option => {
              let newUser = user;
              newUser.questions[2].question = option.key;
              setUser(newUser);
            }}
            cancelText={t('Filter.cancel')}
            overlayStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
            initValueTextStyle={{color: '#3a3a3a', fontSize: 15, letterSpacing: 1}}
            selectStyle={{
              backgroundColor: '#ffdcae',
              width: '90%',
              alignSelf: 'center',
              borderWidth: 0,
              borderRadius: 10,
              padding: 10,
            }}
            selectTextStyle={{
              color: '#000000',
              fontSize: 15,
              letterSpacing: 0.5,
            }}
            optionTextStyle={{
              color: '#000000',
              fontSize: 15,
              letterSpacing: 0.5,
            }}
            selectedItemTextStyle={{
              color: '#FC912F',
              fontSize: 15,
              fontWeight: 'bold',
              letterSpacing: 0.5,
            }}
          />

          <QuestionFieldInput
            value={user.questions[2]?.answer}
            onChangeText={text => {
              let newUser = {...user};
              newUser.questions[2].answer = text;
              setUser(newUser);
            }}
            placeholder={t('profile.question_placeholder')}
          />

          <LittleSpacer />
        </ContentView>
        {navButton}
      </CustomView>
    </>
  );
};

export default QuestionProfil;
