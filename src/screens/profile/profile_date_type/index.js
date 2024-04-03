import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { UpdateButton } from '../../../components/UpdateUser';
import crashlytics from '@react-native-firebase/crashlytics';
import { getStorage } from '../../../functions/storage';

import { CustomView } from '../../../components/StyledComponents/Profile/General/CustomView';
import { InputView } from '../../../components/StyledComponents/Profile/General/InputView';
import { ConditionText } from '../../../components/StyledComponents/Profile/General/ConditionText';
import { MainText } from '../../../components/StyledComponents/Profile/General/MainText';
import { PageTitle } from '../../../components/StyledComponents/Profile/General/PageTitle';
import {
  HeaderView,
  HeaderText,
} from '../../../components/StyledComponents/Profile/General/Header';
import { ContentView } from '../../../components/StyledComponents/Profile/General/ContentView';
import { SwitchSelectorCustom } from '../../../components/StyledComponents/Profile/General/ConditionText/Test';


const Recherche = ({ route, navigation }) => {
  const [user, setUser] = useState({});
  const { t } = useTranslation();
  const [navButton, setNavButton] = useState(null);

  useEffect(() => {
    getStorage('user')
      .then(fetchedUser => {
        if (fetchedUser.preferences == undefined) {
          fetchedUser.preferences = {};
        }
        if (fetchedUser.preferences.searchFriend == undefined) {
          fetchedUser.preferences.searchFriend = false;
        }
        if (fetchedUser.preferences.searchLove == undefined) {
          fetchedUser.preferences.searchLove = true;
        }

        setUser(fetchedUser);
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  }, []);

  useEffect(() => {
    if (
      user.preferences?.searchFriend != undefined &&
      user.preferences?.searchLove != undefined
    ) {
      setNavButton(
        <UpdateButton
          user={{ preferences: user.preferences }}
          prevPage="Profile3"
          nextPage="Profile5"
          navigation={navigation}
        />,
      );
    } else {
      setNavButton(
        <>
          <ConditionText>{t('profile.fill')}</ConditionText>
          <UpdateButton
            user={{ preferences: user.preferences }}
            prevPage="Profile3"
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
        <PageTitle>Que recherchez vous sur l'application ?</PageTitle>
        <InputView>
          <SwitchSelectorCustom
            initial={user?.preferences?.searchLove ? 0 : 1}
            onPress={value => {
              if (value === 'Love') {
                user.preferences.searchLove = true;
                user.preferences.searchFriend = false;
              } else {
                user.preferences.searchLove = false;
                user.preferences.searchFriend = true;
              }
            }}
            buttonColor="#FC912F"
            hasPadding
            options={[
              { label: "rechercher l'amour", value: 'Love' },
              { label: "se faire des amis", value: 'Friends' }
            ]}
          />
        </InputView>
      </ContentView>
      {navButton}
    </CustomView>
  );
};

export default Recherche;
