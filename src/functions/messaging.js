import messaging from '@react-native-firebase/messaging';
import { onDisplayNotification } from "./notification";
import { addStorageMessage } from "./storage";
import perf from '@react-native-firebase/perf';
import crashlytics from '@react-native-firebase/crashlytics';

const onMessageReceived = async (remoteMessage) => {
  const trace = await perf().startTrace('onMessageReceived');
  crashlytics().log('A new FCM message arrived in background!', JSON.stringify(remoteMessage));
  if (process.env.NODE_ENV === "development") {
    console.log('A new FCM message arrived in background!', JSON.stringify(remoteMessage));
  }
  try {
    const newMessage = JSON.parse(remoteMessage.data.message);
    if (newMessage !== undefined && newMessage !== null) {
      const conversation_id = newMessage.conversation_id;
      if (conversation_id !== undefined && conversation_id !== null && conversation_id !== "") {
        addStorageMessage(conversation_id, newMessage);
      }
    }
  } catch (error) {
    crashlytics().recordError(error);
  }
  try {
    const newNotification = JSON.parse(remoteMessage.data.notification);
    if (newNotification !== undefined && newNotification !== null) {
      onDisplayNotification(newNotification.title, newNotification.body);
    }
  } catch (error) {
    crashlytics().recordError(error);
  }
  trace.stop();
}


export const messageLisner = () => {
  messaging().setBackgroundMessageHandler(onMessageReceived);
  messaging().onMessage(onMessageReceived);
}

