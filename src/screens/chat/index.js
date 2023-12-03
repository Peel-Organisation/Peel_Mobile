import React, { useState } from "react";
import { View } from "react-native";
import MessageList from '../../components/Message_List';
import MessageInput from '../../components/Message_Input';


const Chat = ({ route }) => {
    const { conversation } = route.params;
    const [messages, setMessages] = useState([]);

    return (
        <View>
            <MessageList conversation_id={conversation._id} messages={messages} setMessages={setMessages} />
            <MessageInput conversation_id={conversation._id} messages={messages} setMessages={setMessages} />
        </View>
    );

}



export default Chat;













