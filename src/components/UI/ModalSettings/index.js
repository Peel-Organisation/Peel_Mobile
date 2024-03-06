import {Modal, Text} from 'react-native';
import '../../../config/translationInit';
import {useTranslation} from 'react-i18next';
import {
    Container, 
    Overlay, 
    Button, 
    Icon, 
    Content,
    Button_Settings,
    Button_Settings_Text,
    Flag,
    ButtonView,
    ButtonText
} from './styles';
import { Spacer } from '../../../screens/register/styles';

const ModalSettings = ({closeModal, modalVisible}) => {
  const {t, i18n} = useTranslation();
console.log('modalVisible', modalVisible);


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
            <Button_Settings onPress={() => i18n.changeLanguage('en')} modalVisible={false}>
                <ButtonView onPress={closeModal}>
                    <Flag source={require('../../../img/tabIcons/flagEnglish.png')} /> 
                    <ButtonText>{t('settings.language_en')}</ButtonText>
                </ButtonView>
            </Button_Settings>
            <Button_Settings onPress={() => i18n.changeLanguage('fr')}>
              <Button_Settings_Text>
                <Flag source={require('../../../img/tabIcons/flagFrench.png')} />
                {t('settings.language_fr')}
              </Button_Settings_Text>
            </Button_Settings>
          </Content>
        </Container>
      </Modal>
    </>
  );
};

export default ModalSettings;
