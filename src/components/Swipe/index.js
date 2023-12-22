import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-card-stack-swiper';
import {sendSwipe} from '../../functions/api_request';
import Swipe_Card from '../Swipe_Card';
import {ButtonStack, CardStackView, Button, Icon} from './styles';

const Swipe = props => {
  const [userList, setUserList] = useState(props.userList);

  useEffect(() => {
    setUserList(props.userList);
  }, [props.userList]);

  if (userList !== undefined) {
    return (
      <>
        <CardStackView
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}>
          {userList.map(user => (
            <Card
              key={user._id}
              user={user}
              onSwipedLeft={() => {
                sendSwipe(user, 'dislike');
              }}
              onSwipedRight={() => {
                sendSwipe(user, 'like');
              }}>
              <Swipe_Card User={user} />
            </Card>
          ))}
        </CardStackView>
        <ButtonStack>
          <Button
            onPress={() => {
              this.swiper.swipeLeft();
            }}>
            <Icon source={require('../../../assets/images/icons/cross.png')} />
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
