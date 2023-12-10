import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import MessageList from '../../components/Message_List';
import MessageInput from '../../components/Message_Input';
import { KeyboardAvoidingViewCustom } from './styles';



const Chat = ({ route }) => {
    const { conversation } = route.params;
    const [messages, setMessages] = useState([]);

    return (
        <KeyboardAvoidingViewCustom behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <MessageList conversation_id={conversation._id} messages={messages} setMessages={setMessages} />
            <MessageInput conversation_id={conversation._id} messages={messages} setMessages={setMessages} />
        </KeyboardAvoidingViewCustom>
    );

}



export default Chat;













