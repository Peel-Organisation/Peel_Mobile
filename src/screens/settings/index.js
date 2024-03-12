import React, { useState, Image } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import crashlytics from '@react-native-firebase/crashlytics';
import { onDisplayNotification } from '../../functions/notification';
import Modal from '../../components/UI/ModalSettings';
import {
  Header,
  HeaderText,
  BarStyle,
  SettingsView,
  IconSettings,
  SettingsList,
  ButtonSettings,
  ButtonSettingsText,
} from './styles';

import '../../config/translationInit';
import { Linking } from 'react-native';

const Settings = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {t, i18n} = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  };

  const ModalContent= () => {
    return (
      <>
        <ButtonSettings onPress={() => i18n.changeLanguage('en')}>
          <ButtonSettingsText>
            <Image source={require('../../../assets/images/icons/flagEnglish.png')} />
            {t('settings.language_en')}
          </ButtonSettingsText>
        </ButtonSettings>
        <ButtonSettings onPress={() => i18n.changeLanguage('fr')}>
          <ButtonSettingsText>
            <Image source={require('../../../assets/images/icons/flagFrench.png')} />
            {t('settings.language_fr')}
          </ButtonSettingsText>
        </ButtonSettings>
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
        <Modal
          closeModal={closeModal}
          modalVisible={modalVisible}
          // ModalContent={ModalContent}
        />
      )}
      <Header>
        <HeaderText>{t('settings.title')}</HeaderText>
        <BarStyle />
      </Header>
      <SettingsView>
        <SettingsList>
          <ButtonSettings onPress={() => navigation.navigate('Profile')}>
            <IconSettings source={require('../../../assets/images/icons/preferences.png')} />
            <ButtonSettingsText>
              {t('settings.preferences')}
            </ButtonSettingsText>
          </ButtonSettings>

          <ButtonSettings onPress={() => { setModalVisible(true);}}>
            <IconSettings source={require('../../../assets/images/icons/language.png')} />
            <ButtonSettingsText>
              {t('settings.language')}
            </ButtonSettingsText>
          </ButtonSettings>

          <ButtonSettings
            onPress={() =>
              onDisplayNotification('settings', 'Voici la notification de test')
            }>
            <IconSettings source={require('../../../assets/images/icons/notification.png')} />
            <ButtonSettingsText>
              Notification
            </ButtonSettingsText>
          </ButtonSettings>

          <ButtonSettings onPress={() => navigation.navigate('EditProfile')}>
            <IconSettings source={require('../../../assets/images/icons/edit.png')} />
            <ButtonSettingsText>
              {t('settings.edit_profile')}
            </ButtonSettingsText>
          </ButtonSettings>

          <ButtonSettings
            onPress={() =>
              Linking.openURL(
                'https://sites.google.com/view/peelapp/nous-contacter',
              )
            }>
            <IconSettings source={require('../../../assets/images/icons/contact-mail.png')} />
            <ButtonSettingsText>
              {t('settings.contact')}
            </ButtonSettingsText>
          </ButtonSettings>

          <ButtonSettings onPress={Logout}>
            <IconSettings source={require('../../../assets/images/icons/logout.png')} />
            <ButtonSettingsText>
              {t('settings.logout')}
              </ButtonSettingsText>
          </ButtonSettings>

        </SettingsList>
      </SettingsView>
    </>
  );
};

export default Settings;
