import React, { useEffect, useState } from "react";
import {FlatList, Text, View} from 'react-native';
import { getIceBreakerQuestions, sendMessage } from "../../functions/api_request";
import { CustomFlatList, Container, Question, QuestionButton } from "./styles";
import { addStorageMessage, getStorage } from "../../functions/storage";
import crashlytics from '@react-native-firebase/crashlytics';

const IceBreaker = ({ conversation_id, setMessages, messages}) => {
  const [questionList, setQuestionList] = useState([{}]);
  const [userId, setUserId] = useState(0);

  const submitMessage = ( value ) => {
    sendMessage(conversation_id, value)
    const newMessage = { sender: userId, content: value, createdAt: Date.now(), }
    addStorageMessage(conversation_id, newMessage)
    setMessages([...messages, newMessage]);
  };

  useEffect(()=> {
    getIceBreakerQuestions().then(data => {
      setQuestionList(data);
    });

    getStorage('userId').then(data => {
      setUserId(data);
    }).catch((error) => {
      crashlytics().recordError(error)
    })
  },[])

  return(
    <Container>
      <FlatList data={questionList} renderItem={({item}) => (<QuestionButton onPress={()=> submitMessage(item.question)}><Question>{item.question}</Question></QuestionButton>)} keyExtractor={(item) => item._id}/>
    </Container>
  );
}

export default IceBreaker;