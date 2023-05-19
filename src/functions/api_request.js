import  { addStorage, getStorage, Logout } from './storage';
import { FetchPeelApi } from "./request_fetch";
import messaging from '@react-native-firebase/messaging';
import { update_messaging } from './update_messaging';


export const GetUser = async (defaultUser) => {
    console.log("\n\n GetUser")
    const token = await  getStorage('token')
    return FetchPeelApi({url : "/api/user/", method:"GET", token:token}).then(res => {
        let user = res;
        console.log("User fetched : ", user);
        if (user.birthday == null) {
            user.birthday = new Date();
            user.birthday.setFullYear(user.birthday.getFullYear() - 18);
        }
        console.log("User authenticated : ", user);
        addStorage("user", user)
        return user
    }).catch(error => {
        console.log("error whith api : ", error)
        addStorage("user", defaultUser)  
        return false
    });
}

export const updateUser = async (user) => {
    console.log("\n\n updateUser :", user)
    addStorage('user', user);
    const token = await  getStorage('token')
    return FetchPeelApi({url : "/api/user/", method:"PUT", body: user, token:token}).then(res => {
        console.log(res);
        return (res);
    }).catch(error => {
        console.log("error : ", error)
    });
}


export  const  TestAuth = async () => {
    console.log("\n\n TestAuth")
    const firebaseToken = await messaging().getToken()
    const token = await  getStorage('token')
    if (token == null || token == undefined) {
        console.log("User not authenticated");
        await Logout(); 
        return false;
    }
    return FetchPeelApi({url : "/api/auth/protected", method:"GET", token:token, firebaseToken:firebaseToken}).then(res => {
        if (res == null || res == undefined || res == "") {
            Logout();
            return false;
        } else {
            update_messaging();
            return true;
        }
    }).catch(error => {
        console.log("error : ", error)
        return false;
    });
}

export const GetMatchList = async () => {
    console.log("\n\n GetMatchList")
    const token = await  getStorage('token')
    return FetchPeelApi({url : "/api/match/swipeProfil", method:"GET", token:token}).then(res => {
        return (res);
    }).catch(error => {
        console.log("error : ", error)
    });
}







export const sendSwipe = async (user_target, typeOfLike) => {
    console.log("\n\n sendSwipe")
    const token = await  getStorage('token')
    const  body ={ type: typeOfLike }
    return FetchPeelApi({url : `/api/match/like/${user_target._id}`, method:"POST", body:body, token:token}).then(res => {
        return (res);
    }).catch(error => {
        console.log("error : ", error)
    });
}




export const loginRequest = async (email, password, navigation) => {
    console.log("\n\nlogin request")
    const firebaseToken = await messaging().getToken()
    const body = { email: email, password: password }
    return FetchPeelApi({url : `/api/auth/login`, method:"POST", body:body, firebaseToken:firebaseToken}).then(res => {
        addStorage("token", res['token'].toString())
        addStorage("userId", res['userId'].toString())
        console.log("connecté")
        navigation.navigate("Auth");
        update_messaging();
    }).catch(error => {
        console.log("api error : ", error);
    }); 
}

export const registerRequest = async (email, password, navigation) => {
    console.log("\n\nregister request")
    const firebaseToken = await messaging().getToken()
    const body = { email: email, password: password }
    return FetchPeelApi({url : `/api/auth/register`, method:"POST", body:body, firebaseToken:firebaseToken}).then(res => {
        addStorage("token", res['token'])
        addStorage("userId", res['userId'].toString())
        console.log("connecté")
        navigation.navigate("Profile");
    })
}


export const getInterestList = async () => {
    console.log("\n\n GetInterestList")
    return FetchPeelApi({url : "/api/interest", method:"GET"}).then(res => {
        return (res);
    }).catch(error => {
        console.log("api error : ", error);
    }); 
}

export const getQuestionList = async () => {
    console.log("\n\n getQuestionList")
    return FetchPeelApi({url : "/api/question", method:"GET"}).then(res => {
        for (let i = 0; i < res.length; i++) {
            let newobj = {};
            console.log("old obj : ", res[i])
            newobj.key = res[i]._id;
            newobj.label = res[i].question;
            res[i] = newobj;
            console.log("newobj : ", newobj)
      }
        return (res);
    })
}

export const GetContactList = async () => {
    console.log("\n\n GetContactList")
    const token = await  getStorage('token')
    return FetchPeelApi({url : "/api/conversation/", method:"GET", token:token}).then(res => {
        return (res);
    }).catch(error => {
        console.log("error : ", error)
    });
}


export const getMessageList = async (conversationId) => {
    console.log("\n\n getMessageList")
    const token = await  getStorage('token')
    return FetchPeelApi({url : `/api/conversation/message/${conversationId}`, method:"GET", token:token}).then(res => {
        return (res);
    })
}

export const sendMessage = async (conversationId, message) => {
    console.log("\n\n sendMessage : ", message)
    const token = await  getStorage('token')
    const body = {message: message}
    return FetchPeelApi({url : `/api/conversation/message/${conversationId}`, method:"POST", token:token, body:body}).then(res => {
        return (res);
    })
};