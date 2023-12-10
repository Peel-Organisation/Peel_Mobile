import React, { useEffect, useState } from 'react';
import { CustomFlatList } from './styles';

import messaging from '@react-native-firebase/messaging';
import { getStorageMessage, getStorage } from "../../functions/storage";
import { FlatList } from 'react-native';
import { MessageUser } from '../Message_Card';
import crashlytics from '@react-native-firebase/crashlytics';



const MessageList = ({ conversation_id, messages, setMessages }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getStorageMessage(conversation_id).then(data => {
      setMessages(data);
    }).catch((error) => {
      crashlytics().recordError(error)
    })

    getStorage('userId').then(data => {
      setUserId(data);
    }).catch((error) => {
      crashlytics().recordError(error)
    })
  }, []);

  messaging().onMessage(async remoteMessage => {
    crashlytics().log('A new FCM message arrived in front!', JSON.stringify(remoteMessage));
    try {
      const newMessage = JSON.parse(remoteMessage?.data?.message);
      let index = messages.findIndex((message) => message._id == newMessage._id);
      if ((newMessage.sender != userId) && (index !== null && index == -1 && userId !== null)) {
        console.log("newMessage", newMessage);
        const message = { "content": newMessage.content, "time": newMessage.sentTime, "sender": newMessage.sender, "createdAt": newMessage.createdAt, "_id": newMessage._id };
        setMessages([...messages, message]);
      }
    } catch (error) {
      console.error("error", error);
      crashlytics().recordError(error);
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