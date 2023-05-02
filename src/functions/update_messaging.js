import { GetContactList, getMessageList } from "./api_request"
import { getStorageMessage, updateStorageMessage } from "./storage"

export const update_messaging = async () => {
    console.log("\n\n update_messaging")
    GetContactList().then((ContactMessageList) => {
        console.log("ContactMessageList : ", ContactMessageList)
        for (let contact of ContactMessageList) {
            getStorageMessage(contact._id).then((MessageStorageList) => {
                console.log("MessageStorageList : ", MessageStorageList.length)
                console.log("contact.nb_messages : ", contact.nb_messages)
                if(MessageStorageList.length !== contact.nb_messages) {
                    getMessageList(contact._id).then((messages) => {
                        console.log("messages : ", messages)
                        updateStorageMessage(contact._id, messages)
                    })
                }
            })
        }
    })
}
    