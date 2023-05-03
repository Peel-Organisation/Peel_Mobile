import AsyncStorage from '@react-native-async-storage/async-storage';



export const  Logout = async ()  =>{
  AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiRemove(keys).then(() => {
      }).catch((error) => {
          showMessage({
            message: "storage error : ", error,
            type: "info",
          });
          console.log("storage error : ", error);
      });
  }).catch((error) => {
    showMessage({
      message: "storage error : ", error,
      type: "info",
    });
    console.log("storage error : ", error);
  });
}

export const  getStorage = async (value) =>{
    return AsyncStorage.getItem(value).then((getItem) => {
        return JSON.parse(getItem)
    }).catch(error => {
        console.log("storage error : ", error);
    })
}

export const  addStorage = async (name, value) =>{
    console.log("add to storage : ", name, value)
    if (name === undefined || name === null || name === "") return (false);
    return AsyncStorage.setItem(name, JSON.stringify(value)).then(() => {
        return (true);
    }).catch((error) => {
        console.log("storage error : ", error);
        return (false);
    });
}

export const  removeStorage = async (name) =>{
    return AsyncStorage.removeItem(name).then(() => {
        return (true);
    }).catch((error) => {
        console.log("storage error : ", error);
        return (false);
    });
}

export const  addStorageMessage = async (conversation_id, message) =>{
    return getStorage(conversation_id).then((messages) => {
        if (messages == null){
            messages = [];
        }
        messages.push(message);
        addStorage(conversation_id, messages);
    }).catch((error) => {
        console.log("storage error : ", error);
        return (false);
    });
}

export const updateStorageMessage = async (conversation_id, messages) =>
    addStorage(conversation_id, messages);


export const  getStorageMessage = async (conversation_id) =>{
    return getStorage(conversation_id).then((messages) => {
        if (messages == null){
            messages = [];
        }
        return (messages);
    }).catch((error) => {
        console.log("storage error : ", error);
        return (false);
    });
}
