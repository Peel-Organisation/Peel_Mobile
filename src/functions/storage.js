import AsyncStorage from '@react-native-async-storage/async-storage';
import perf from '@react-native-firebase/perf';
import crashlytics from '@react-native-firebase/crashlytics';




export const  Logout = async ()  =>{
    const trace = await perf().startTrace('Logout');
    crashlytics().log("Logout")
    AsyncStorage.getAllKeys().then((keys) => {
        AsyncStorage.multiRemove(keys).then(() => {
        }).catch((error) => {
            showMessage({
                message: "storage error : ", error,
                type: "info",
            });
            crashlytics().recordError(error);
        });
    }).catch((error) => {
        showMessage({
        message: "storage error : ", error,
        type: "info",
        });
        crashlytics().recordError(error);
    });
    trace.stop();
}

export const  getStorage = async (value) =>{
    const trace = await perf().startTrace('getStorage');
    crashlytics().log("get from storage : ", value)
    return AsyncStorage.getItem(value).then((getItem) => {
        trace.stop();
        return JSON.parse(getItem)
    }).catch(error => {
        crashlytics().recordError(error);
    })
}

export const  addStorage = async (name, value) =>{
    const trace = await perf().startTrace('addStorage');
    crashlytics().log("add to storage : ", name, value)
    if (name === undefined || name === null || name === "") return (false);
    return AsyncStorage.setItem(name, JSON.stringify(value)).then(() => {
        trace.stop();
        return (true);
    }).catch((error) => {
        crashlytics().recordError(error);
        return (false);
    });
}

export const  removeStorage = async (name) =>{
    crashlytics().log("remove from storage : ", name)
    const trace = await perf().startTrace('removeStorage')
    return AsyncStorage.removeItem(name).then(() => {
        trace.stop();
        return (true);
    }).catch((error) => {
        crashlytics().recordError(error);
        return (false);
    });
}

export const  addStorageMessage = async (conversation_id, message) =>{
    const trace = await perf().startTrace('addStorageMessage');
    return getStorage(conversation_id).then((messages) => {
        if (messages == null){
            messages = [];
        }
        messages.push(message);
        addStorage(conversation_id, messages);
        trace.stop();
    }).catch((error) => {
        crashlytics().recordError(error);
        return (false);
    });
}

export const updateStorageMessage = async (conversation_id, messages) =>
    addStorage(conversation_id, messages);


export const  getStorageMessage = async (conversation_id) =>{
    crashlytics().log("get from storage : ", conversation_id)
    const trace = await perf().startTrace('getStorageMessage');
    return getStorage(conversation_id).then((messages) => {
        if (messages == null){
            messages = [];
        }
        trace.stop();
        return (messages);
    }).catch((error) => {
        crashlytics().recordError(error);
        return (false);
    });
}
