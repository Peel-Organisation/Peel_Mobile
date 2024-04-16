import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import crashlytics from '@react-native-firebase/crashlytics';
import { getStorage } from '../../../functions/storage';
import {
  HeaderView,
  HeaderText,
  HeaderTextView,
  BarStyle,
  GoBackArrow,
  GoBackArrowImage,
} from '../styles/header.js'
import {
  CustomView,
  ContentView,
  FieldInput,
  LabelInput,
  PageTitle,
  SwitchSelectorCustom,
  DatePickerCustom,
  BioInput
} from '../styles/content.js';

import { UpdateButton } from '../../../components/UpdateUser';
import { ConditionText } from '../../../components/StyledComponents/Profile/General/ConditionText';
import settings from '../../../../assets/images/icons/settings-white.png';
import { Spacer } from '../../login/styles/index.js';


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
        <UpdateButton
          user={{ biographie: user.biographie }}
          prevPage="Profile2"
          nextPage="Profile5"
          navigation={navigation}
        />,
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
        <GoBackArrow onPress={() => navigation.navigate('Settings')}>
          <GoBackArrowImage source={settings} />
        </GoBackArrow>
        <HeaderTextView> 
          <HeaderText>{t('profile.title')}</HeaderText>
          <BarStyle />
        </HeaderTextView>
      </HeaderView>
      <ContentView>
        <Spacer />
        <PageTitle>{t('profile.biography')}</PageTitle>
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
          onSubmitEditing={Keyboard.dismiss}
        />
      </ContentView>
      {navButton}
    </CustomView>
  );
};

export default Biographie;
