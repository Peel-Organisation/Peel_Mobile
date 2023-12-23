import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-card-stack-swiper';
import Swipe_Card from '../Swipe_Card';
import { sendSwipe, createInstantConversation } from '../../functions/api_request';
import { ButtonStack, CardStackView, Button, Icon, ModalButton, ModalButtonText } from './styles';
import Modal from '../UI/Modal';
import { Text } from 'react-native';


const Swipe = (props) => {
  const [userList, setUserList] = useState(props.userList);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  }

  const ModalContent = (
    <>
      <Text>Etes vous sur de vouloir envoyer un message a cette personne ?</Text>
      <Text>Vous ne pourrez utiliser cette fonctionalité qu'une seule fois</Text>
      <Text>Après avoir appuyé vous pourrez directement retrouver l'utilisateur dans vos contacts</Text>
      <ModalButton onPress={() => {
        const currentUser = this.swiper.state.topCard;
        if (currentUser == "cardA") {
          const user = this.swiper.state.cardA.props.user;
          createInstantConversation(user._id);
        } else if (currentUser == "cardB") {
          const user = this.swiper.state.cardB.props.user;
          createInstantConversation(user._id);
        }
        closeModal();
      }}
      >
        <ModalButtonText>Send Message</ModalButtonText>
      </ModalButton>

    </>
  );

  useEffect(() => {
    setUserList(props.userList);
  }, [props.userList]);

  if (userList !== undefined) {
    return (
      <>
        {modalVisible && (
          <Modal closeModal={closeModal} content={ModalContent} modalVisible={modalVisible} />
        )}
        <CardStackView
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}>
          {userList.map(user => (
            <Card
              onSwipedLeft={() => {
                sendSwipe(user, 'dislike');
              }}
              onSwipedRight={() => {
                sendSwipe(user, 'like');
              }}
              key={user._id}
              user={user}>
              <Swipe_Card User={user} />
            </Card>
          ))}
        </CardStackView>
        <ButtonStack>
          <Button
            onPress={() => {
              this.swiper.swipeLeft();
            }}>
            <Icon source={require("../../../assets/images/icons/cross.png")} />
          </Button>
          <Button onPress={() => setModalVisible(true)}>
            <Icon source={require('../../../assets/images/icons/instantmessage.png')} />
          </Button>
          <Button
            onPress={() => {
              this.swiper.swipeRight();
            }}>
            <Icon source={require('../../../assets/images/icons/heart.png')} />
          </Button>
        </ButtonStack>
      </>
    );
  }
};



export default Swipe;
