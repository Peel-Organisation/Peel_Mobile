import React, { useEffect, useState } from "react";
import MessageList from '../../components/Message_List';
import MessageInput from '../../components/Message_Input';
import IceBreaker from "../../components/IceBreaker";
import { KeyboardAvoidingViewCustom } from './styles';
import { getStorageMessage, getStorage } from "../../functions/storage";
import { TouchableOpacity } from "react-native";



const Chat = ({ route }) => {
    const { conversation } = route.params;
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        getStorageMessage(conversation._id).then(data => {
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


    return (
        <KeyboardAvoidingViewCustom behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {
                messages.length === 0 ? (
                    <IceBreaker conversation_id={conversation._id} setMessages={setMessages} messages={messages}/>
                ) : (
                    <>
                        <MessageList messages={messages} setMessages={setMessages} userId={userId}/>
                        <MessageInput conversation_id={conversation._id} messages={messages} setMessages={setMessages} />
                    </>
                )
            }
        </KeyboardAvoidingViewCustom>
    );
}

export default Chat;