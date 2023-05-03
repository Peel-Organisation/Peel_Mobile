import messaging from '@react-native-firebase/messaging';
import { onDisplayNotification } from "./notification";
import { addStorageMessage } from "./storage";

const onMessageReceived = async (remoteMessage) => {
  console.log('A new FCM message arrived in background!', JSON.stringify(remoteMessage));
  try {
    const newMessage = JSON.parse(remoteMessage.data.message);
    if (newMessage !== undefined && newMessage !== null) {
      const conversation_id = newMessage.conversation_id;
      if (conversation_id !== undefined && conversation_id !== null && conversation_id !== ""){
        addStorageMessage(conversation_id, newMessage);
      }
    }
  } catch (error) {
    console.log('error : ', error);
  }
  try {
    const newNotification = JSON.parse(remoteMessage.data.notification);
    if (newNotification !== undefined && newNotification !== null) {
      onDisplayNotification(newNotification.title, newNotification.body);
    }
  } catch (error) {
    console.log('error : ', error);
  }
}


export const messageLisner = () => {
  messaging().setBackgroundMessageHandler(onMessageReceived);
  messaging().onMessage(onMessageReceived);
}

