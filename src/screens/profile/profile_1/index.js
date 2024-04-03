import React, { useState, useEffect } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { useTranslation } from 'react-i18next';
import { InputView } from '../../../components/StyledComponents/Profile/General/InputView';
import { CustomView } from '../../../components/StyledComponents/Profile/General/CustomView';
import { ConditionText } from '../../../components/StyledComponents/Profile/General/ConditionText';
import { FieldInput } from '../../../components/StyledComponents/Profile/General/FieldInput';
import {
  HeaderView,
  HeaderText,
} from '../../../components/StyledComponents/Profile/General/Header';
import { ContentView } from '../../../components/StyledComponents/Profile/General/ContentView';
import { UpdateButton } from '../../../components/UpdateUser';
import { getStorage } from '../../../functions/storage';

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
        <>
          <UpdateButton
            user={{ firstName: user.firstName, lastName: user.lastName }}
            prevPage=""
            nextPage="Profile2"
            navigation={navigation}
          />
        </>,
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
        <HeaderText>{t('profile.title')}</HeaderText>
      </HeaderView>
      <ContentView>
        <InputView>
          <FieldInput
            value={user.firstName}
            onChangeText={text => {
              let newUser = { ...user };
              newUser.firstName = text;
              setUser(newUser);
            }}
            placeholder={t('profile.firstname')}
          />
        </InputView>
        <InputView>
          <FieldInput
            value={user.lastName}
            onChangeText={text => {
              let newUser = { ...user };
              newUser.lastName = text;
              setUser(newUser);
            }}
            placeholder={t('profile.lastname')}
          />
        </InputView>
      </ContentView>
      {navButton}
    </CustomView>
  );
};

export default Profile1;
