import React, { useState, useEffect } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { useTranslation } from 'react-i18next';
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
  FieldInput,
  LabelInput
} from '../styles/content.js';
import { ConditionText } from '../../../components/StyledComponents/Profile/General/ConditionText';
import { UpdateButton } from '../../../components/UpdateUser';
import { getStorage } from '../../../functions/storage';
import arrow from '../../../../assets/images/icons/top-arrow-white.png';
import { Spacer } from '../../login/styles/index.js';

const Profile1 = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [navButton, setNavButton] = useState(null);

  useEffect(() => {
    getStorage('user')
      .then(fetchedUser => {
        setUser(fetchedUser);
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  }, []);

  useEffect(() => {
    if (
      user.firstName != undefined &&
      user.firstName != '' &&
      user.lastName != undefined &&
      user.lastName != ''
    ) {
      setNavButton(
        <UpdateButton
          user={{ firstName: user.firstName, lastName: user.lastName }}
          prevPage=""
          nextPage="Profile2"
          navigation={navigation}
        />,
      );
    } else {
      setNavButton(
        <>
          <ConditionText>{t('profile.fill')}</ConditionText>
          <UpdateButton
            user={{ firstName: user.firstName, lastName: user.lastName }}
            prevPage=""
            nextPage=""
            navigation={navigation}
          />
        </>,
      );
    }
  }, [user]);

  return (
    <CustomView>
      <HeaderView>
        <GoBackArrow onPress={() => navigation.navigate('Settings')}>
          <GoBackArrowImage source={arrow} />
        </GoBackArrow>
        <HeaderTextView> 
          <HeaderText>{t('profile.title')}</HeaderText>
          <BarStyle />
        </HeaderTextView>
      </HeaderView>
      <ContentView>
      
        <Spacer />
        <LabelInput>{t('profile.modify_firstname')}</LabelInput>
        <FieldInput
          value={user.firstName}
          onChangeText={text => {
            let newUser = { ...user };
            newUser.firstName = text;
            setUser(newUser);
          }}
          placeholder={t('profile.firstname')}
        />
        <Spacer />
        <LabelInput>{t('profile.modify_name')}</LabelInput>
        <FieldInput
          value={user.lastName}
          onChangeText={text => {
            let newUser = { ...user };
            newUser.lastName = text;
            setUser(newUser);
          }}
          placeholder={t('profile.lastname')}
        />
      </ContentView>
      {navButton}
    </CustomView>
  );
};

export default Profile1;
