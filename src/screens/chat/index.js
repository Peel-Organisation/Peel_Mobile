import React, {useState, useEffect} from 'react';
import MessageList from '../../components/Message_List';
import MessageInput from '../../components/Message_Input';
import {
  BackButton,
  Avatar,
  AvatarName,
  AvatarContainer,
  ProgressBarContainer,
  ProgressBar,
  Badge,
  BadgeContainer,
  CustomProgressBarContainer,
  Tooltip,
  TooltipText,
} from '../../components/Chat/ChatHeader';
import {TouchableOpacity} from 'react-native';
import peelLogo from '../../img/peel_logo3.png';
import backButton from '../../../assets/images/icons/backbutton.png';
import level1 from '../../../assets/images/icons/level1.png';
import level2 from '../../../assets/images/icons/level2.png';
import level3 from '../../../assets/images/icons/level3.png';
import {getNumberOfMessages} from '../../functions/api_request';

import {KeyboardAvoidingViewCustom, Header} from './styles';

const Chat = ({route, navigation}) => {
  const {conversation} = route.params;
  const [messages, setMessages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handlePress = () => {
    setTooltipVisible(!tooltipVisible);
  };

  useEffect(() => {
    getNumberOfMessages(conversation._id)
      .then(res => {
        setProgress(res.nb_messages);
      })
      .catch(error => {
        console.error(error);
      });
  }, [conversation._id, messages]);

  return (
    <>
      <Header>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <BackButton source={backButton} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <AvatarContainer>
          <Avatar source={peelLogo} style={{width: 80, height: 80}} />
          <AvatarName>{conversation.members[1].firstName}</AvatarName>
        </AvatarContainer>
        <CustomProgressBarContainer>
          <BadgeContainer onPress={handlePress}>
            <Badge
              source={
                Number(progress) < 6
                  ? level1
                  : Number(progress) < 10
                  ? level2
                  : level3
              }
            />
          </BadgeContainer>
          {tooltipVisible && (
            <Tooltip>
              <TooltipText>1: Messages</TooltipText>
              <TooltipText>2: Vocal + Gifs</TooltipText>
              <TooltipText>3: Images</TooltipText>
            </Tooltip>
          )}
          <ProgressBarContainer>
            <ProgressBar progress={progress} />
          </ProgressBarContainer>
        </CustomProgressBarContainer>
      </Header>
      <KeyboardAvoidingViewCustom
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <MessageList
          conversation_id={conversation._id}
          messages={messages}
          setMessages={setMessages}
        />
        <MessageInput
          conversation_id={conversation._id}
          messages={messages}
          setMessages={setMessages}
        />
      </KeyboardAvoidingViewCustom>
    </>
  );
};

export default Chat;
