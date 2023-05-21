import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import crashlytics from '@react-native-firebase/crashlytics';

import {onDisplayNotification} from '../../functions/notification';

import {
  SettingsView,
  SettingsList,
  Button_Settings,
  Button_Settings_Text,
  SettingsTitle,
} from './styles';

import '../../config/translationInit';

const Settings = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const Logout = () => {
    crashlytics().log('Logout pressed');
    AsyncStorage.getAllKeys()
      .then(keys => {
        AsyncStorage.multiRemove(keys)
          .then(() => {
            crashlytics().log('Logout success');
            navigation.navigate('Public');
          })
          .catch(error => {
            crashlytics().recordError(error);
          });
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  };

  return (
    <SettingsView>
      <SettingsTitle>{t('settings.title')}</SettingsTitle>
      <SettingsList>
        <Button_Settings onPress={Logout}>
          <Button_Settings_Text>{t('settings.logout')}</Button_Settings_Text>
        </Button_Settings>
        <Button_Settings onPress={() => navigation.navigate('Profile')}>
          <Button_Settings_Text>
            {t('settings.preferences')}
          </Button_Settings_Text>
        </Button_Settings>
        <Button_Settings onPress={() => i18n.changeLanguage('fr')}>
          <Button_Settings_Text>
            {t('settings.language_fr')}
          </Button_Settings_Text>
        </Button_Settings>
        <Button_Settings onPress={() => i18n.changeLanguage('en')}>
          <Button_Settings_Text>
            {t('settings.language_en')}
          </Button_Settings_Text>
        </Button_Settings>
        <Button_Settings
          onPress={() =>
            onDisplayNotification('settings', 'Voici la notification de test')
          }>
          <Button_Settings_Text>Notification</Button_Settings_Text>
        </Button_Settings>
        <Button_Settings onPress={() => navigation.navigate('EditProfile')}>
          <Button_Settings_Text>
            {t('settings.edit_profile')}
          </Button_Settings_Text>
        </Button_Settings>
      </SettingsList>
    </SettingsView>
  );
};

export default Settings;
