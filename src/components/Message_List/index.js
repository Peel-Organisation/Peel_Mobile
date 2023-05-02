import React, { useEffect, useState } from 'react';
import {CustomFlatList } from './styles';

import messaging from '@react-native-firebase/messaging';
import { getStorageMessage, addStorageMessage, getStorage } from "../../functions/storage";
import { FlatList } from 'react-native';
import { MessageUser } from '../Message_Card';



const MessageList = ({conversation_id, messages, setMessages}) => {
  const [userId, setUserId] = useState(0);
  
  useEffect(() => {
    getStorageMessage(conversation_id).then(data => {
      setMessages(data);
    });
    
    getStorage('userId').then(data => {
      setUserId(data);
    });
  }, []);

  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const newMessage = JSON.parse(remoteMessage.data.message);
      let index = messages.findIndex((message) => message._id == newMessage._id);
      if (index == -1 && newMessage.conversation_id == conversation_id && newMessage.sender != userId){
        setMessages([...messages, newMessage]);
        addStorageMessage(conversation_id, newMessage);
      }
    });
  }, []);


  return (
    <CustomFlatList>
        <FlatList 
          data={[...Object.values(messages)].sort((a, b) => a.time - b.time).reverse()}
          renderItem={({ item }) => <MessageUser message={item} userId={userId} key={userId} />}
          keyExtractor={(item) => item._id}
          extraData={messages}
          inverted 
        />
    </CustomFlatList>
  );
}







export default MessageList;