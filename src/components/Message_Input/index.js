import React, { useEffect, useState } from 'react';
import { FieldInput, MessageButton, ViewCustom, SendIcon } from './styles';
const sendpng = require('./styles/send.png');
import { sendMessage } from "../../functions/api_request";
import { addStorageMessage, getStorage } from "../../functions/storage";

const MessageInput = ({conversation_id, messages, setMessages}) => {
  const [value, setValue] = useState('');
  const [userId, setUserId] = useState(0);

  const submitMessage = () => {
    sendMessage(conversation_id, value)
    const newMessage = {sender: userId, content: value, createdAt: Date.now(), }
    addStorageMessage(conversation_id, newMessage)
    setMessages([...messages, newMessage]);
    setValue('');
  }; 

  useEffect(() => {
    getStorage('userId').then(data => {
      setUserId(data);
    });
  }, []);

  return (
    <ViewCustom>
        <FieldInput
          value={value}
          onChangeText={(text) =>  setValue(text)}
        />
        <MessageButton onPress={() => submitMessage()}>
          <SendIcon source={sendpng}/>
        </MessageButton>   
    </ViewCustom>
  );
};


export default MessageInput;