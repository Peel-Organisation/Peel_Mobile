import messaging from '@react-native-firebase/messaging';
import { onDisplayNotification } from "./notification";
import { addStorageMessage } from "./storage";

const onMessageReceived = async (remoteMessage) => {
  console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  const newMessage = JSON.parse(remoteMessage.data.message);
  const newNotification = JSON.parse(remoteMessage.data.notification);
  console.log('newMessage : ', newMessage);
  console.log('newNotification : ', newNotification);
  if (newNotification !== undefined && newNotification !== null) {
    onDisplayNotification(newNotification.title, newNotification.body);
  }
  if (newMessage !== undefined && newMessage !== null) {
    const conversation_id = newMessage.conversation_id;
    addStorageMessage(conversation_id, newMessage);
  }
}


export const messageLisner = () => {
  messaging().setBackgroundMessageHandler(onMessageReceived);
  messaging().onMessage(onMessageReceived);
}

