import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { UpdateButton } from '../../../components/UpdateUser';
import { useTranslation } from 'react-i18next';
import { Slider } from '@miblanchard/react-native-slider';
import crashlytics from '@react-native-firebase/crashlytics';

import { getStorage } from '../../../functions/storage';

import { SliderCustom } from '../../../components/StyledComponents/Profile/General/ConditionText/Test';

import { CustomView } from '../../../components/StyledComponents/Profile/General/CustomView';
import { InputView } from '../../../components/StyledComponents/Profile/General/InputView';
import { ConditionText } from '../../../components/StyledComponents/Profile/General/ConditionText';
import { MainText } from '../../../components/StyledComponents/Profile/General/MainText';
import {
  HeaderView,
  HeaderText,
} from '../../../components/StyledComponents/Profile/General/Header';

const Location = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({
    position: { longitude: 0, latitude: 0 },
    preferences: { searchRange: 100 },
  });
  const [navButton, setNavButton] = useState(null);

  useEffect(() => {
    getStorage('user')
      .then(fetchedUser => {
        if (
          fetchedUser.position?.longitude == undefined ||
          fetchedUser.position?.longitude == '' ||
          fetchedUser.position?.longitude == null
        ) {
          fetchedUser.position.longitude = 0;
        }
        if (
          fetchedUser.position?.latitude == undefined ||
          fetchedUser.position?.latitude == '' ||
          fetchedUser.position?.latitude == null
        ) {
          fetchedUser.position.latitude = 0;
        }
        if (
          fetchedUser.preferences?.searchRange == undefined ||
          fetchedUser.preferences?.searchRange == '' ||
          fetchedUser.preferences?.searchRange == null
        ) {
          fetchedUser.preferences.searchRange = 100;
        }
        setUser(fetchedUser);
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
    getOneTimeLocation();
  }, []);

  useEffect(() => {
    if (
      user.position?.longitude != undefined &&
      user.position?.longitude != 0 &&
      user.position?.latitude != undefined &&
      user.position?.latitude != 0 &&
      user.preferences?.searchRange != undefined &&
      user.preferences?.searchRange != 0
    ) {
      setNavButton(
        <>
          <UpdateButton
            user={{ position: user.position, preferences: user.preferences }}
            prevPage="Profile6"
            nextPage="Profile8"
            navigation={navigation}
          />
        </>,
      );
    } else {
      setNavButton(
        <>
          <ConditionText>{t('profile.fill')}</ConditionText>
          <UpdateButton
            user={{ position: user.position, preferences: user.preferences }}
            prevPage="Profile5"
            nextPage=""
            navigation={navigation}
          />
        </>,
      );
    }
  }, [user]);

  const getOneTimeLocation = async () => {
    crashlytics().log('getOneTimeLocation', Platform.OS);
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LocationWhenInUse)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              crashlytics().log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              crashlytics().log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.LIMITED:
              crashlytics().log(
                'The permission is limited: some actions are possible',
              );
              break;
            case RESULTS.GRANTED:
              crashlytics().log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              crashlytics().log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          crashlytics().recordError(error);
        });
    } else if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    Geolocation.getCurrentPosition(
      position => {
        crashlytics().log('position : ', position);
        let newUser = user;
        newUser.position.longitude = position.coords.longitude;
        newUser.position.latitude = position.coords.latitude;
        setUser(newUser);
      },
      error => {
        // See error code charts below.
        crashlytics().recordError(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  return (
    <CustomView>
      <HeaderView>
        <HeaderText>{t('profile.search_zone')}</HeaderText>
      </HeaderView>
      <InputView>
        <MainText> {user.preferences?.searchRange} km</MainText>
        <SliderCustom>
          <Slider
            value={user.preferences?.searchRange}
            minimumValue={5}
            maximumValue={1000}
            step={5}
            onValueChange={value => {
              let newUser = { ...user };
              newUser.preferences.searchRange = value;
              setUser(newUser);
            }}
          />
        </SliderCustom>
      </InputView>
      <MapView
        provider={
          Platform.OS === 'android' ? PROVIDER_GOOGLE : MapView.PROVIDER_GOOGLE
        }
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height - 300,
        }}
        region={{
          latitude: user.position?.latitude,
          longitude: user.position?.longitude,
          latitudeDelta: user.preferences?.searchRange / 30,
          longitudeDelta: user.preferences?.searchRange / 30,
        }}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}>
        <Circle
          key={(user.position?.longitude + user.position?.latitude).toString()}
          center={{
            latitude: user.position?.latitude,
            longitude: user.position?.longitude,
          }}
          radius={user.preferences?.searchRange * 1000}
          strokeWidth={1}
          strokeColor={'#1a66ff'}
          fillColor={'rgba(230,238,255,0.5)'}
        />
      </MapView>

      {navButton}
    </CustomView>
  );
};

export default Location;
