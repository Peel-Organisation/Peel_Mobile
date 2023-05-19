import notifee from "@notifee/react-native";
import perf from '@react-native-firebase/perf';
import crashlytics from '@react-native-firebase/crashlytics';


export const onDisplayNotification = async (title, body) => {
  const trace = await perf().startTrace('onDisplayNotification');
  await notifee.requestPermission()
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  crashlytics().log('channel créer');
  crashlytics().log('title : ', title);
  crashlytics().log('body : ', body);
  if (body === undefined) return;
  if (body === null) return;
  if (typeof body != "string") return;
  if (title === undefined) return;
  if (title === null) return;
  if (typeof title != "string") return;

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      // smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
  crashlytics().log('notification affichée');
  trace.stop();
}