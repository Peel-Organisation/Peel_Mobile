import { UserMessage, UserMessageText, ContactMessage, ContactMessageText } from './styles';


export const MessageUser = (params) => {
  const message = params.message
  const message_UserId = message?.sender;
  const userId = params.userId;   
  if (message_UserId != undefined){
    if ( userId == message_UserId) {
      return (
        <UserMessage
          key={message._id}
          title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
        >
          <UserMessageText>{message.content}</UserMessageText>
          <UserMessageText>{new Date(message.createdAt).toLocaleTimeString()}</UserMessageText>
        </UserMessage>
      );
    }else{
      return (
        <ContactMessage
          key={message._id}
          title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
        >
          <ContactMessageText>{message.content}</ContactMessageText>
          <ContactMessageText>{new Date(message.createdAt).toLocaleTimeString()}</ContactMessageText>
        </ContactMessage>
      );
    }
  }
}