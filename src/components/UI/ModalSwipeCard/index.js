import { Modal } from 'react-native';
import { Container, Overlay, Button, Icon, Content } from "./styles";


const ModalSwipeCard = ({ closeModal, content, modalVisible }) => {
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

export default ModalSwipeCard;