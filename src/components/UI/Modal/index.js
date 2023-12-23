import { Container, Overlay, Button, Icon, Content } from "./styles";
import { Modal, StatusBar } from 'react-native';


const ModalCustom = ({ closeModal, content, modalVisible }) => {
    return (
        <>
            <Overlay onPress={() => closeModal()} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onRequestClose={() => {
                    closeModal()
                }}>
                <Container >
                    <Button onPress={() => closeModal()}>
                        <Icon source={require("../../../../assets/images/icons/cross.png")} />
                    </Button>
                    <Content>
                        {content}
                    </Content>
                </Container>
            </Modal>
        </>
    );
};

export default ModalCustom;