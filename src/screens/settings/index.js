import React, {useState, Image, Text} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import crashlytics from '@react-native-firebase/crashlytics';
import {onDisplayNotification} from '../../functions/notification';
import Modal from '../../components/UI/ModalSettings';
import {
  Header,
  HeaderText,
  BarStyle,
  SettingsView,
  IconSettings,
  SettingsList,
  Button_Settings,
  Button_Settings_Text,
} from './styles';

import '../../config/translationInit';
import {Linking} from 'react-native';

const Settings = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {t, i18n} = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  }

  const ModalContent = () => {
    return (
      <>
        <Button_Settings onPress={() => i18n.changeLanguage('en')}>
          <Button_Settings_Text>
            <Image source={require('../../img/tabIcons/flagEnglish.png')} />
            {t('settings.language_en')}
          </Button_Settings_Text>
        </Button_Settings>
        <Button_Settings onPress={() => i18n.changeLanguage('fr')}>
          <Button_Settings_Text>
            <Image source={require('../../img/tabIcons/flagFrench.png')} />
            {t('settings.language_fr')}
          </Button_Settings_Text>
        </Button_Settings>
      </>
    );
  };

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
    <>
      { modalVisible && (
        <Modal closeModal={closeModal} content={ModalContent} modalVisible={modalVisible} />
      )}
      <Header>
        <HeaderText>{t('settings.title')}</HeaderText>
        <BarStyle />
      </Header>
      <SettingsView>
        <SettingsList>
         
          <Button_Settings onPress={() => navigation.navigate('Profile')}>
            <Button_Settings_Text>
              <IconSettings source={require('../../img/tabIcons/preferences.png')} />
              {t('settings.preferences')}
            </Button_Settings_Text>
          </Button_Settings>

          <Button_Settings onPress={() => setModalVisible(true)}>
            <Button_Settings_Text>
              <IconSettings source={require('../../img/tabIcons/language.png')} />
              {t('settings.language')}
            </Button_Settings_Text>
          </Button_Settings>

          <Button_Settings
            onPress={() =>
              onDisplayNotification('settings', 'Voici la notification de test')
            }>
              <Button_Settings_Text>
                <IconSettings source={require('../../img/tabIcons/notification.png')} />
                Notification
              </Button_Settings_Text>
          </Button_Settings>

          <Button_Settings onPress={() => navigation.navigate('EditProfile')}>
            <Button_Settings_Text>
              <IconSettings source={require('../../img/tabIcons/edit.png')} />
              {t('settings.edit_profile')}
            </Button_Settings_Text>
          </Button_Settings>

          <Button_Settings
            onPress={() =>
              Linking.openURL(
                'https://sites.google.com/view/peelapp/nous-contacter',
              )
            }>
            <Button_Settings_Text>
              <IconSettings source={require('../../img/tabIcons/contact-mail.png')} />
              {t('settings.contact')}
            </Button_Settings_Text>
          </Button_Settings>

          <Button_Settings onPress={Logout}>
            <Button_Settings_Text>
              <IconSettings source={require('../../img/tabIcons/logout.png')} />
              {t('settings.logout')}
              </Button_Settings_Text>
          </Button_Settings>
        </SettingsList>
      </SettingsView>
    </>
  );
};

export default Settings;
