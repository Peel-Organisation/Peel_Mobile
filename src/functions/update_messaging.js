import { GetContactList, getMessageList } from "./api_request"
import { getStorageMessage, updateStorageMessage } from "./storage"

export const update_messaging = async () => {
    GetContactList().then((ContactMessageList) => {
        for (let contact of ContactMessageList) {
            getStorageMessage(contact._id).then((MessageStorageList) => {
                if(MessageStorageList.length !== contact.nb_messages) {
                    getMessageList(contact._id).then((messages) => {
                        updateStorageMessage(contact._id, messages)
                    })
                }
            })
        }
    })
}
    