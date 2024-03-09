import { Modal } from 'react-native';
import '../../../config/translationInit';
import { useTranslation } from 'react-i18next';
import {
  Container, 
  Overlay, 
  Button, 
  Icon, 
  Content,
  ButtonSettings,
  Flag,
  ButtonView,
  ButtonText
} from './styles';

const ModalSettings = ({ closeModal, modalVisible }) => {
  const {t, i18n} = useTranslation();

  return (
    <>
      <Overlay onPress={() => closeModal()} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          closeModal();
        }}>
        <Container>
          <Button onPress={() => closeModal()}>
            <Icon
              source={require('../../../../assets/images/icons/cross.png')}
            />
          </Button>
          <Content>
            <ButtonSettings onPress={() => {i18n.changeLanguage('en'); closeModal()}}>
              <ButtonView>
                <Flag source={require('../../../img/tabIcons/flagEnglish.png')} /> 
                <ButtonText>{t('settings.language_en')}</ButtonText>
              </ButtonView>
            </ButtonSettings>
            <ButtonSettings onPress={() => {i18n.changeLanguage('fr'); closeModal()}}>
              <ButtonView>
                <Flag source={require('../../../img/tabIcons/flagFrench.png')} /> 
                <ButtonText>{t('settings.language_fr')}</ButtonText>
              </ButtonView>
            </ButtonSettings>
          </Content>
        </Container>
      </Modal>
    </>
  );
};

export default ModalSettings;
