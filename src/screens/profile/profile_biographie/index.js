import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { UpdateButton } from '../../../components/UpdateUser';
import crashlytics from '@react-native-firebase/crashlytics';
import { getStorage } from '../../../functions/storage';

import { BioInput } from '../../../components/StyledComponents/Profile/General/ConditionText/Test';
import { CustomView } from '../../../components/StyledComponents/Profile/General/CustomView';
import { ConditionText } from '../../../components/StyledComponents/Profile/General/ConditionText';
import { PageTitle } from '../../../components/StyledComponents/Profile/General/PageTitle';
import {
  HeaderView,
  HeaderText,
} from '../../../components/StyledComponents/Profile/General/Header';
import { ContentView } from '../../../components/StyledComponents/Profile/General/ContentView';

const Biographie = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [navButton, setNavButton] = useState(null);

  useEffect(() => {
    getStorage('user')
      .then(fetchedUser => {
        if (fetchedUser.biographie == undefined) {
          fetchedUser.biographie = '';
        }
        setUser(fetchedUser);
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  }, []);

  useEffect(() => {
    if (
      user.biographie != undefined &&
      user.biographie != '' &&
      user.biographie.length < 400 &&
      user.biographie.length > 20
    ) {
      setNavButton(
        <>
          <UpdateButton
            user={{ biographie: user.biographie }}
            prevPage="Profile2"
            nextPage="Profile4"
            navigation={navigation}
          />
        </>,
      );
    } else {
      if (user.biographie != undefined) {
        if (user.biographie.length < 20) {
          setNavButton(
            <>
              <ConditionText>{t('profile.fill_min_bio')}</ConditionText>
              <ConditionText>{t('profile.fill')}</ConditionText>
              <UpdateButton
                user={{ biographie: user.biographie }}
                prevPage="Profile2"
                nextPage=""
                navigation={navigation}
              />
            </>,
          );
        } else if (user.biographie.length > 200) {
          setNavButton(
            <>
              <ConditionText>{t('profile.fill_max_bio')}</ConditionText>
              <ConditionText>{t('profile.fill')}</ConditionText>
              <UpdateButton
                user={user}
                prevPage="Profile2"
                nextPage=""
                navigation={navigation}
              />
            </>,
          );
        }
      } else {
        setNavButton(
          <>
            <ConditionText>{t('profile.fill')}</ConditionText>
            <UpdateButton
              user={user}
              prevPage="Profile2"
              nextPage=""
              navigation={navigation}
            />
          </>,
        );
      }
    }
  }, [user]);

  return (
    <CustomView>
      <HeaderView>
        <HeaderText>{t('profile.title')}</HeaderText>
      </HeaderView>
      <ContentView>
        <PageTitle>{t('profile.biography')}</PageTitle>
        <View>
          <BioInput
            multiline
            numberOfLines={4}
            onChangeText={text => {
              let newUser = { ...user };
              newUser.biographie = text;
              setUser(newUser);
            }}
            value={user.biographie}
            placeholder={t('profile.biography')}
          />
        </View>
      </ContentView>
      {navButton}
    </CustomView>
  );
};

export default Biographie;
