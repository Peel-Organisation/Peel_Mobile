import React, { useEffect, useState } from 'react';
import { UserMessage, UserMessageText, ContactMessage, ContactMessageText, CustomFlatList } from './styles';

import { getMessageList } from "../../functions/api_request";
import { getStorage } from "../../functions/storage"; 
import messaging from '@react-native-firebase/messaging';

import { FlatList } from 'react-native';



const MessageList = ({conversation_id}) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(0);
  
  useEffect(() => {
    console.log("conversation_id : ", conversation_id)
    getMessageList(conversation_id).then(data => {
      console.log("message list : ", data)
      return setMessages(data);
    });
    
    getStorage('userId').then(data => {
      setUserId(data);
    });
  }, [conversation_id]);

  useEffect(() => {    
    
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      messageListener(remoteMessage);
    });
  }, [messaging]);

  const messageListener = (message) => {
    setMessages(...messages, message);
  };



  


  return (
    <CustomFlatList>
        <FlatList 
          data={[...Object.values(messages)].sort((a, b) => a.time - b.time).reverse()}
          renderItem={({ item }) => <Message_user message={item} userId={userId} key={userId} />}
          keyExtractor={(item) => item._id}
          extraData={messages}
          inverted 
        />
    </CustomFlatList>
  );
}

const Message_user = (params) => {
  const message = params.message
  const message_User = message?.sender?.firstName;
  const message_UserId = message?.sender?._id;
  const userId = params.userId;   
  if (message_UserId != undefined){
    if ( userId == message_UserId) {
      return (
        <UserMessage
          key={message._id}
          title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
        >
          <UserMessageText>{message.content}</UserMessageText>
          <UserMessageText>{new Date(message.createdAt).toLocaleTimeString()}</UserMessageText>
        </UserMessage>
      );
    }else{
      return (
        <ContactMessage
          key={message._id}
          title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
        >
          <ContactMessageText>{message_User}</ContactMessageText>
          <ContactMessageText>{message.content}</ContactMessageText>
          <ContactMessageText>{new Date(message.createdAt).toLocaleTimeString()}</ContactMessageText>
        </ContactMessage>
      );
    }
  }
}





export default MessageList;