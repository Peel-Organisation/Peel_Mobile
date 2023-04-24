import React, { useEffect, useState } from 'react';
import { FieldInput, MessageButton, ViewCustom, SendIcon } from './styles';
const sendpng = require('./styles/send.png');
import messaging from '@react-native-firebase/messaging';
import { getStorage } from '../../functions/storage';
import { sendMessage } from "../../functions/api_request";



const MessageInput = ({conversation_id}) => {
  const [value, setValue] = useState('');

  const submitMessage = () => {
    sendMessage(conversation_id, value)
    setValue('');
  }; 


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