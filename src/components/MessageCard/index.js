import { 
  UserMessage, 
  UserMessageText,
  UserMessageDate,
  ContactMessage,
  ContactMessageText,
  ContactMessageDate
} from './styles';


export const MessageUser = (params) => {
  const message = params.message
  const message_UserId = message?.sender;
  const userId = params.userId;   
  if (message_UserId != undefined){
    if ( userId == message_UserId) {
      return (
        <UserMessage
          title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
        >
          <UserMessageText>{message.content}</UserMessageText>
          <UserMessageDate>{new Date(message.createdAt).toLocaleTimeString()}</UserMessageDate>
        </UserMessage>
      );
    }else{
      return (
        <ContactMessage
          title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
        >
          <ContactMessageText>{message.content}</ContactMessageText>
          <ContactMessageDate>{new Date(message.createdAt).toLocaleTimeString()}</ContactMessageDate>
        </ContactMessage>
      );
    }
  }
}