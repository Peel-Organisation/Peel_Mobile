import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-card-stack-swiper';
import Swipe_Card from '../Swipe_Card';
import { sendSwipe, createInstantConversation, GetUser } from '../../functions/api_request';
import { ButtonStack, CardStackView, Button, Icon, ModalButton, ModalButtonText } from './styles';
import Modal from '../UI/Modal';
import { Text } from 'react-native';
import { getStorage, putStorage } from '../../functions/storage';



const Swipe = (props) => {
  const [userList, setUserList] = useState(props.userList);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [loggedUser, setLoggedUser] = useState({});

  const closeModal = () => {
    setModalVisible(false);
  }

  const ModalCreateConversation = (
    <>
      <Text>Etes vous sur de vouloir envoyer un message a cette personne ?</Text>
      <Text>Vous ne pourrez utiliser cette fonctionalité qu'une seule fois</Text>
      <Text>Après avoir appuyé vous pourrez directement retrouver l'utilisateur dans vos contacts</Text>
      <Text>Nombre d'envoi de messages restant : {loggedUser.nbInstantConversationPossibilities}</Text>
      <ModalButton onPress={() => {
        const currentUser = this.swiper.state.topCard;
        if (currentUser == "cardA") {
          const user = this.swiper.state.cardA.props.user;
          createInstantConversation(user._id);
        } else if (currentUser == "cardB") {
          const user = this.swiper.state.cardB.props.user;
          createInstantConversation(user._id);
        }
        putStorage('user', { nbInstantConversationPossibilities: loggedUser.nbInstantConversationPossibilities - 1 });
        setLoggedUser({ ...loggedUser, nbInstantConversationPossibilities: loggedUser.nbInstantConversationPossibilities - 1 });
        closeModal();
      }}
        disabled={loggedUser.nbInstantConversationPossibilities == 0}
      >
        <ModalButtonText>Send Message</ModalButtonText>
      </ModalButton>

    </>
  );

  const ModalNoMoreSwipe = (
    <>
      <Text>Vous avez atteint la limite de swipe pour aujourd'hui</Text>
      <Text>Vous pourrez recommencer demain</Text>
    </>
  );

  const checkSwipePossible = async (user, value) => {
    let loggedUser = await getStorage('user');

    let newUser = { swipeCount: loggedUser.swipeCount };
    if (newUser.swipeCount == undefined) {
      newUser.swipeCount = { count: 0, date: new Date() }
    }
    const swipeDate = new Date(newUser.swipeCount?.date).getDate();
    const swipeMonth = new Date(newUser.swipeCount?.date).getMonth();
    const swipeYear = new Date(newUser.swipeCount?.date).getFullYear();
    const todayDate = new Date().getDate();
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();

    // if the date is not today, reset the counter
    if (swipeDate !== todayDate || swipeMonth !== todayMonth || swipeYear !== todayYear) {
      newUser.swipeCount = { count: 0, date: new Date() }
    }
    // increment the counter
    newUser.swipeCount.count++;
    // if the counter is above 10, return true
    if (newUser.swipeCount.count > 10) {
      if (value == 'like') {
        this.swiper.goBackFromLeft();
      } else {
        this.swiper.goBackFromRight();
      }
      setModalContent(ModalNoMoreSwipe);
      setModalVisible(true);
    } else {
      setLoggedUser({ ...loggedUser, swipeCount: newUser.swipeCount });
      putStorage('user', newUser);
      sendSwipe(user, value)
    }
  }



  useEffect(() => {
    setUserList(props.userList);
    GetUser().then(user => {
      setLoggedUser(user);
    });
  }, [props.userList]);


  if (userList !== undefined) {
    return (
      <>
        {modalVisible && (
          <Modal closeModal={closeModal} content={modalContent} modalVisible={modalVisible} />
        )}
        <CardStackView
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}>
          {userList.map(user => (
            <Card
              onSwipedLeft={() => {
                checkSwipePossible(user, 'dislike');
              }}
              onSwipedRight={() => {
                checkSwipePossible(user, 'like');
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
          <Button onPress={() => {
            setModalContent(ModalCreateConversation);
            setModalVisible(true);
          }}>
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
