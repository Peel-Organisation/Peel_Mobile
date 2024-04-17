import React, { useState } from "react";
import MessageList from '../../components/MessageList';
import MessageInput from '../../components/MessageInput';
import { KeyboardAvoidingView } from "react-native";

const Chat = ({ route }) => {
    const { conversation } = route.params;
    const [messages, setMessages] = useState([]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            style={{ flex: 1 }}
        >
            <MessageList conversation_id={conversation._id} messages={messages} setMessages={setMessages} />
            <MessageInput conversation_id={conversation._id} messages={messages} setMessages={setMessages} />   
        </KeyboardAvoidingView>
    );
}

export default Chat;













