import  { addStorage, getStorage, Logout } from './storage';
import { FetchPeelApi } from "./request_fetch";
import messaging from '@react-native-firebase/messaging';
import { update_messaging } from './update_messaging';
import crashlytics from '@react-native-firebase/crashlytics';



export const GetUser = async (defaultUser) => {
    crashlytics().log("\n\n GetUser")
    const token = await  getStorage('token')
    return FetchPeelApi({url : "/api/user/", method:"GET", token:token}).then(res => {
        let user = res;
        crashlytics().log("User fetched : ", user);
        if (user.birthday == null) {
            user.birthday = new Date();
            user.birthday.setFullYear(user.birthday.getFullYear() - 18);
        }
        crashlytics().log("User authenticated : ", user);
        crashlytics().setUserId(user._id);
        addStorage("user", user)
        return user
    }).catch(error => {
        crashlytics().recordError(error)
        addStorage("user", defaultUser)  
        return false
    });
}

export const updateUser = async (user) => {
    crashlytics().log("\n\n updateUser")
    addStorage('user', user);
    const token = await  getStorage('token')
    return FetchPeelApi({url : "/api/user/", method:"PUT", body: user, token:token}).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}


export  const  TestAuth = async () => {
    crashlytics().log("\n\n TestAuth")
    const firebaseToken = await messaging().getToken()
    const token = await  getStorage('token')
    if (token == null || token == undefined) {
        crashlytics().log("User not authenticated");
        await Logout(); 
        return false;
    }
    return FetchPeelApi({url : "/api/auth/protected", method:"GET", token:token, firebaseToken:firebaseToken}).then(res => {
        if (res == null || res == undefined || res == "") {
            Logout();
            return false;
        } else {
            crashlytics().log("User authenticated");
            crashlytics().setUserId(res.userId.toString());
            update_messaging();
            return true;
        }
    }).catch(error => {
        crashlytics().recordError(error)
        return false;
    });
}

export const IsProfileCompleted = async () => {
    crashlytics().log("\n\n IsProfileCompleted")
    const token = await  getStorage('token')
    return FetchPeelApi({url : "/api/user/verifyProfileCompleted", method:"GET", token:token}).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}


export const GetMatchList = async () => {
    crashlytics().log("\n\n GetMatchList")
    const token = await  getStorage('token')
    return FetchPeelApi({url : "/api/match/swipeProfil", method:"GET", token:token}).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}







export const sendSwipe = async (user_target, typeOfLike) => {
    crashlytics().log("\n\n sendSwipe")
    const token = await  getStorage('token')
    const  body ={ type: typeOfLike }
    return FetchPeelApi({url : `/api/match/like/${user_target._id}`, method:"POST", body:body, token:token}).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}




export const loginRequest = async (email, password, navigation) => {
    crashlytics().log("\n\nlogin request")
    const firebaseToken = await messaging().getToken()
    const body = { email: email, password: password }
    return FetchPeelApi({url : `/api/auth/login`, method:"POST", body:body, firebaseToken:firebaseToken}).then(res => {
        addStorage("token", res['token'].toString())
        addStorage("userId", res['userId'].toString())
        crashlytics().log("connecté")
        crashlytics().setUserId(res['userId'].toString());
        navigation.navigate("Auth");
        update_messaging();
    }).catch(error => {
        crashlytics().recordError(error);
    }); 
}

export const registerRequest = async (email, password, navigation) => {
    crashlytics().log("\n\nregister request")
    const firebaseToken = await messaging().getToken()
    const body = { email: email, password: password }
    return FetchPeelApi({url : `/api/auth/register`, method:"POST", body:body, firebaseToken:firebaseToken}).then(res => {
        addStorage("token", res['token'])
        addStorage("userId", res['userId'].toString())
        crashlytics().log("connecté")
        crashlytics().setUserId(res['userId'].toString());
        navigation.navigate("Profile");
    }).catch((error) => {
      crashlytics().recordError(error)
    })
}


export const getInterestList = async () => {
    crashlytics().log("\n\n GetInterestList")
    return FetchPeelApi({url : "/api/interest", method:"GET"}).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error);
    }); 
}

export const getQuestionList = async () => {
    crashlytics().log("\n\n getQuestionList")
    return FetchPeelApi({url : "/api/question", method:"GET"}).then(res => {
        for (let i = 0; i < res.length; i++) {
            let newobj = {};
            crashlytics().log("old obj : ", res[i])
            newobj.key = res[i]._id;
            newobj.label = res[i].question;
            res[i] = newobj;
            crashlytics().log("newobj : ", newobj)
        }
        return (res);
    }).catch((error) => {
        crashlytics().recordError(error)
    })
}

export const GetContactList = async () => {
    crashlytics().log("\n\n GetContactList")
    const token = await  getStorage('token')
    return FetchPeelApi({url : "/api/conversation/", method:"GET", token:token}).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}


export const getMessageList = async (conversationId) => {
    crashlytics().log("\n\n getMessageList")
    const token = await  getStorage('token')
    return FetchPeelApi({url : `/api/conversation/message/${conversationId}`, method:"GET", token:token}).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}

export const sendMessage = async (conversationId, message) => {
    crashlytics().log("\n\n sendMessage : ", message)
    const token = await  getStorage('token')
    const body = {message: message}
    return FetchPeelApi({url : `/api/conversation/message/${conversationId}`, method:"POST", token:token, body:body}).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
};