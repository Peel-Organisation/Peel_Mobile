import React, { useEffect, useState } from 'react';
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
  LabelInput,
  SwitchSelectorCustom,
  DatePickerCustom,
  LittleSpacer
} from '../styles/content.js';
import settings from '../../../../assets/images/icons/settings-white.png';
import { UpdateButton } from '../../../components/UpdateUser';
import { ConditionText } from '../../../components/StyledComponents/Profile/General/ConditionText';

const Profile2 = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({ birthday: new Date() });
  const [navButton, setNavButton] = useState(null);

  useEffect(() => {
    getStorage('user')
      .then(fetchedUser => {
        if (fetchedUser.birthday == undefined) {
          fetchedUser.birthday = new Date();
          fetchedUser.birthday.setFullYear(
            fetchedUser.birthday.getFullYear() - 18,
          );
        } else {
          fetchedUser.birthday = new Date(fetchedUser.birthday);
          let age =
            new Date().getFullYear() - fetchedUser.birthday.getFullYear();
          crashlytics().log(age);
          if (age < 18) {
            fetchedUser.birthday.setFullYear(
              fetchedUser.birthday.getFullYear() - 18,
            );
          }
        }
        if (fetchedUser.gender == undefined) {
          fetchedUser.gender = "Male";
        }
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
    let age = new Date().getFullYear() - user.birthday.getFullYear();
    crashlytics().log(age);
    if (
      user.birthday != undefined &&
      user.birthday != '' &&
      user.gender != undefined &&
      user.gender != '' &&
      user.preferences?.searchFriend != undefined &&
      user.preferences?.searchLove != undefined &&
      age >= 18 &&
      age < 99
    ) {
      setNavButton(

        <UpdateButton
          user={{ birthday: user.birthday, gender: user.gender, preferences: user.preferences }}
          prevPage="Profile1"
          nextPage="Profile3"
          navigation={navigation}
        />,
      );
    } else {
      setNavButton(
        <>
          <ConditionText>Remplissez tous les champs</ConditionText>
          <UpdateButton
            user={{ birthday: user.birthday, gender: user.gender, preferences: user.preferences }}
            prevPage="Profile1"
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
          <GoBackArrowImage source={settings}/>
        </GoBackArrow>
        <HeaderTextView> 
          <HeaderText>{t('profile.title')}</HeaderText>
          <BarStyle />
        </HeaderTextView>
      </HeaderView>
      <ContentView>
        <LittleSpacer />
        <LabelInput>{t('profile.birth_date')}</LabelInput>
        <LittleSpacer />
        <DatePickerCustom
          date={user['birthday']}
          onDateChange={date => {
            let newUser = { ...user };
            newUser['birthday'] = date;
            setUser(newUser);
          }}
          mode="date"
        />
        <LittleSpacer />
        <LabelInput>{t('profile.gender')}</LabelInput>
        <LittleSpacer />
        <SwitchSelectorCustom
          initial={0}
          onPress={value => {
            let newUser = { ...user };
            newUser.gender = value;
            setUser(newUser);
          }}
          buttonColor="#FC912F"
          hasPadding
          options={[
            { label: t('profile.male_gender'), value: 'Male' },
            { label: t('profile.female_gender'), value: 'Female' },
            { label: t('profile.other_gender'), value: 'Other' },
          ]}
        />
        <LittleSpacer />
        <LabelInput>{t('profile.type_of_search')}</LabelInput>
        <LittleSpacer />
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
              { label: t('profile.search_love'), value: 'Love' },
              { label: t('profile.search_friend'), value: 'Friends' }
            ]}
          />

      </ContentView>
      {navButton}
    </CustomView>
  );
};

export default Profile2;
