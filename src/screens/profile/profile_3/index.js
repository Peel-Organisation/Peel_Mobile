import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Update_Button} from '../../../components/Update_User';
import crashlytics from '@react-native-firebase/crashlytics';
import {getStorage} from '../../../functions/storage';

import {Slider} from '@miblanchard/react-native-slider';

import {
  SwitchSelectorCustom,
  SliderCustom,
} from '../../../components/StyledComponents/Profile/General/ConditionText/Test';
import {CustomView} from '../../../components/StyledComponents/Profile/General/CustomView';
import {InputView} from '../../../components/StyledComponents/Profile/General/InputView';
import {ConditionText} from '../../../components/StyledComponents/Profile/General/ConditionText';
import {MainText} from '../../../components/StyledComponents/Profile/General/MainText';
import {PageTitle} from '../../../components/StyledComponents/Profile/General/PageTitle';
import {
  HeaderView,
  HeaderText,
} from '../../../components/StyledComponents/Profile/General/Header';
import {ContentView} from '../../../components/StyledComponents/Profile/General/ContentView';

const Recherche = ({route, navigation}) => {
  const [user, setUser] = useState({});
  const {t} = useTranslation();
  const [navButton, setNavButton] = useState(null);

  useEffect(() => {
    getStorage('user')
      .then(fetchedUser => {
        if (fetchedUser.preferences == undefined) {
          fetchedUser.preferences = {};
        }
        if (
          fetchedUser.preferences?.sexual_orientation == undefined ||
          fetchedUser.preferences?.sexual_orientation == ''
        ) {
          fetchedUser.preferences.sexual_orientation = 'hetero';
        }
        if (fetchedUser.preferences?.age == undefined) {
          fetchedUser.preferences.age = {};
        }
        if (
          fetchedUser.preferences?.age?.min == undefined ||
          fetchedUser.preferences?.age?.min < 0
        ) {
          fetchedUser.preferences.age.min = 20;
        }
        if (
          fetchedUser.preferences?.age?.max == undefined ||
          fetchedUser.preferences?.age?.max > 99 ||
          fetchedUser.preferences?.age?.max < fetchedUser.preferences?.age?.min
        ) {
          fetchedUser.preferences.age.max =
            fetchedUser.preferences.age.min + 10;
        }
        setUser(fetchedUser);
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  }, []);

  useEffect(() => {
    if (
      user.preferences?.age?.min != undefined &&
      user.preferences?.age?.min != 0 &&
      user.preferences?.age?.max != undefined &&
      user.preferences?.age?.max != 0 &&
      user.preferences?.sexual_orientation != undefined &&
      user.preferences?.sexual_orientation != ''
    ) {
      setNavButton(
        <>
          <Update_Button
            user={user}
            prevPage="Profile2"
            nextPage="Profile4"
            navigation={navigation}
          />
        </>,
      );
    } else {
      setNavButton(
        <>
          <ConditionText>{t('profile.fill')}</ConditionText>
          <Update_Button
            user={user}
            prevPage="Profile2"
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
        <PageTitle>{t('profile.age')}</PageTitle>
        <InputView>
          <SliderCustom>
            <Slider
              value={[user.preferences?.age?.min, user.preferences?.age?.max]}
              minimumValue={18}
              maximumValue={99}
              step={1}
              thumbTintColor="#FC912F"
              minimumTrackTintColor="#FC912F"
              onValueChange={value => {
                let newUser = {...user};
                newUser.preferences.age.min = value[0];
                newUser.preferences.age.max = value[1];
                setUser(newUser);
              }}
            />
          </SliderCustom>
          <MainText>
            {t('profile.min_age')}: {user.preferences?.age?.min}
          </MainText>
          <MainText>
            {t('profile.max_age')}: {user.preferences?.age?.max}
          </MainText>
        </InputView>
        <InputView>
          <MainText>{t('profile.sexual_preference')}</MainText>
          <View>
            <SwitchSelectorCustom
              initial={1}
              buttonColor="#FC912F"
              onPress={value => {
                let newUser = {...user};
                newUser.preferences.sexual_orientation = value;
                setUser(newUser);
              }}
              hasPadding
              options={[
                {label: t('profile.homo_search'), value: 'homo'},
                {label: t('profile.hetero_search'), value: 'hetero'},
                {label: t('profile.bi_search'), value: 'bi'},
              ]}
            />
          </View>
        </InputView>
      </ContentView>
      {navButton}
    </CustomView>
  );
};

export default Recherche;
