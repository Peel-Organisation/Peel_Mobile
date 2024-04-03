import React, { useState } from "react";
import MessageList from '../../components/MessageList';
import MessageInput from '../../components/MessageInput';
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













