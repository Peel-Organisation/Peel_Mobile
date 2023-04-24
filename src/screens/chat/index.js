import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, SafeAreaView } from "react-native";
import MessageList from '../../components/Message_List';
import MessageInput from '../../components/Message_Input';
import io from "socket.io-client";

import Loading from '../../components/loading';

const ENDPOINT = process.env['API_LINK']

// import Message from "./messaging.component"




 
const Chat = ({ route, navigation }) => {
    const { conversation } = route.params;



    

    return (
        <View>
            <View>
                <MessageList conversation_id={conversation._id} />
                <MessageInput conversation_id={conversation._id} />
            </View>
        </View>
    );

}



export default Chat;






 




  

