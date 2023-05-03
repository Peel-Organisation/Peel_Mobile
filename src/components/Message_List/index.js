import React, { useEffect, useState } from 'react';
import {CustomFlatList } from './styles';

import messaging from '@react-native-firebase/messaging';
import { getStorageMessage, getStorage } from "../../functions/storage";
import { FlatList } from 'react-native';
import { MessageUser } from '../Message_Card';



const MessageList = ({conversation_id, messages, setMessages}) => {
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    getStorageMessage(conversation_id).then(data => {
      setMessages(data);
    });
    
    getStorage('userId').then(data => {
      setUserId(data);
    });
  }, []);

  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived in front!', JSON.stringify(remoteMessage));
    try {
      const newMessage = JSON.parse(remoteMessage?.data?.message);
      let index = messages.findIndex((message) => message._id == newMessage._id);
      if (index !== null && index == -1 && userId !== null && newMessage.conversation_id == conversation_id && newMessage.sender != userId){
        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  });


  return (
    <CustomFlatList>
        <FlatList 
          data={[...Object.values(messages)].sort((a, b) => a.time - b.time).reverse()}
          renderItem={({ item }) => <MessageUser message={item} userId={userId} key={userId} />}
          keyExtractor={(item, index) => index}
          extraData={messages}
          inverted 
        />
    </CustomFlatList>
  );
}







export default MessageList;