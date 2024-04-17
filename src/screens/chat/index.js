import React, { useState } from "react";
import MessageList from '../../components/MessageList';
import MessageInput from '../../components/MessageInput';

const Chat = ({ route }) => {
    const { conversation } = route.params;
    const [messages, setMessages] = useState([]);

    return (
        <>
            <MessageList conversation_id={conversation._id} messages={messages} setMessages={setMessages} />
            <MessageInput conversation_id={conversation._id} messages={messages} setMessages={setMessages} />
        </>
    );
}

export default Chat;













