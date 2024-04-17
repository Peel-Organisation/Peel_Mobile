import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import crashlytics from '@react-native-firebase/crashlytics';
import { getStorage } from '../../../functions/storage';
import { getInterestList } from '../../../functions/api_request';
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
  LittleSpacer,
  PageTitle,
  InterestButton,
  InterestButtonText,
  InterestButtonSelected,
  InterestButtonDisabled,
  InterestView,
  ScrollContainer,
} from '../styles/content.js';
import { Spacer } from '../../login/styles/index.js';
import settings from '../../../../assets/images/icons/settings-white.png';
import Loading from '../../../components/Loading';
import { UpdateButton } from '../../../components/UpdateUser';
import { ConditionText } from '../../../components/StyledComponents/Profile/General/ConditionText';
import StatusBarCustom from '../../../components/UI/StatusBarCustom/index.js';

const ProfileInterest = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [InterestList, setInterestList] = useState([{}]);
  const [user, setUser] = useState({ interests: [] });
  const [loading, setLoading] = React.useState(true);
  const [navButton, setNavButton] = useState(null);

  useEffect(() => {
    getStorage('user')
      .then(fetchedUser => {
        if (fetchedUser.interests == undefined) {
          fetchedUser.interests = [];
        }
        setUser(fetchedUser);
      })
      .catch(error => {
        crashlytics().recordError(error);
      });

    getInterestList()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (typeof data[i] == 'string') {
            data[i] = JSON.parse(data[i]);
          }
        }
        setInterestList(data);
        setLoading(false);
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  }, []);

  const containsObject = (obj, list) => {
    let i;
    if (list == undefined) {
      return false;
    }
    for (i = 0; i < list.length; i++) {
      if (list[i]._id === obj._id) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    if (user.interests?.length == 5) {
      setNavButton(
        <UpdateButton
          user={{ interests: user.interests }}
          prevPage="Profile7"
          nextPage="Profile9"
          navigation={navigation}
        />,
      );
    } else {
      setNavButton(
        <>
          <ConditionText>{t('profile.fill')}</ConditionText>
          <UpdateButton
            user={{ interests: user.interests }}
            prevPage="Profile7"
            nextPage=""
            navigation={navigation}
          />
        </>,
      );
    }
  }, [user]);

  const addInterest = interest => {
    if (user.interests?.length < 5) {
      crashlytics().log('interest = ', interest);
      let newUser = { ...user };
      newUser.interests.push(interest);
      setUser(newUser);
    }
  };

  const removeInterest = interest => {
    let newUser = { ...user };
    if (typeof interest == 'string') {
      interest = JSON.parse(interest);
    }
    crashlytics().log('interest = ', interest._id);
    newUser.interests = newUser.interests?.filter(
      item => item._id !== interest._id,
    );
    setUser(newUser);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <StatusBarCustom bgColor="#FC912F" theme="light-content"/>
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
        <Spacer />
        <PageTitle>{t('profile.interest_choice')}</PageTitle>
        <LittleSpacer />
        <ScrollContainer>
          <InterestView>
            {InterestList.map(interest => {
              if (containsObject(interest, user.interests)) {
                return (
                  <InterestButtonSelected
                    key={interest._id}
                    onPress={() => removeInterest(interest)}>
                    <InterestButtonText>{interest.name}</InterestButtonText>
                  </InterestButtonSelected>
                );
              } else if (user.interests?.length < 5) {
                return (
                  <InterestButton
                    key={interest._id}
                    onPress={() => addInterest(interest)}>
                    <InterestButtonText>{interest.name}</InterestButtonText>
                  </InterestButton>
                );
              } else {
                return (
                  <InterestButtonDisabled
                    key={interest._id}
                    onPress={() => addInterest(interest)}
                    disabled>
                    <InterestButtonText>{interest.name}</InterestButtonText>
                  </InterestButtonDisabled>
                );
              }
            })}
          </InterestView>
        </ScrollContainer>
        {navButton}
      </CustomView>
    </>
  );
};

export default ProfileInterest;
