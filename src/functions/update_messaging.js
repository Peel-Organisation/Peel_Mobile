import { GetContactList, getMessageList } from "./api_request"
import { getStorageMessage, updateStorageMessage } from "./storage"
import crashlytics from '@react-native-firebase/crashlytics';
import perf from '@react-native-firebase/perf';


export const update_messaging = async () => {
    crashlytics().log("\n\n update_messaging")
    const trace = await perf().startTrace('update_messaging');
    GetContactList().then((ContactMessageList) => {
        for (let contact of ContactMessageList) {
            getStorageMessage(contact._id).then((MessageStorageList) => {
                if(MessageStorageList.length !== contact.nb_messages) {
                    getMessageList(contact._id).then((messages) => {
                        updateStorageMessage(contact._id, messages)
                    }).catch((error) => {
                        crashlytics().recordError(error)
                    })
                } else {
                    crashlytics().log("no new message")
                }
            }).catch((error) => {
                crashlytics().recordError(error)
            })
        }
    }).catch((error) => {
        crashlytics().recordError(error)
    })
    trace.stop();
}
    