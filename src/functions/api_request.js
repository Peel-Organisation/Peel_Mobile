import axios from "axios";
import { API_LINK } from '@env';
import  { addStorage, getStorage, Logout } from './storage';
import { FetchPeelApi } from "./request_fetch";


export const GetUser = async (defaultUser) => {
    console.log("\n\n GetUser")
    let token = await  getStorage('token')
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
    console.log("\n\n updateUser")
    addStorage('user', user);
    let token = await  getStorage('token')
    return FetchPeelApi({url : "/api/user/", method:"PUT", body: user, token:token}).then(res => {
        return (res);
    }).catch(error => {
        console.log("error : ", error)
    });
}


export  const  TestAuth = async () => {
    console.log("\n\n TestAuth")
    let token = await  getStorage('token')
    let auth_bool = false;
    if (token == null || token == undefined) {
        console.log("User not authenticated");
        await Logout(); 
        return auth_bool;
    }
    return FetchPeelApi({url : "/api/auth/protected", method:"GET", token:token}).then(res => {
        if (res == null || res == undefined || res == "") {
            Logout();
            return auth_bool;
        } else {
            auth_bool = true
            return auth_bool;
        }
    }).catch(error => {
        console.log("error : ", error)
        return auth_bool;
    });
}

export const GetMatchList = async () => {
    console.log("\n\n GetMatchList")
    let token = await  getStorage('token')
    return FetchPeelApi({url : "/api/match/swipeProfil", method:"GET", token:token}).then(res => {
        return (res);
    }).catch(error => {
        console.log("error : ", error)
    });
}




export const GetContactList = async () => {
    console.log("\n\n GetContactList")
    let token = await  getStorage('token')
    return FetchPeelApi({url : "/api/conversation/", method:"GET", token:token}).then(res => {
        return (res);
    }).catch(error => {
        console.log("error : ", error)
    });
}


export const sendSwipe = async (user_target, typeOfLike) => {
    console.log("\n\n sendSwipe")
    let token = await  getStorage('token')
    const  body ={ type: typeOfLike }
    return FetchPeelApi({url : `/api/match/like/${user_target._id}`, method:"POST", body:body, token:token}).then(res => {
        return (res);
    }).catch(error => {
        console.log("error : ", error)
    });
}




export const loginRequest = async (email, password, navigation) => {
    console.log("\n\nlogin request")
    const body = { email: email, password: password }
    return FetchPeelApi({url : `/api/auth/login`, method:"POST", body:body}).then(res => {
        addStorage("token", res['token'].toString())
        addStorage("userId", res['userId'].toString())
        console.log("connecté")
        navigation.navigate("Auth");
    }).catch(error => {
        console.log("api error : ", error);
    }); 
}

export const registerRequest = async (email, password, navigation) => {
    console.log("\n\nregister request")
    const body = { email: email, password: password }
    return FetchPeelApi({url : `/api/auth/register`, method:"POST", body:body}).then(res => {
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


export const getMessageList = async (conversationId) => {
    console.log("\n\n getMessageList")
    let token = await  getStorage('token')
    return FetchPeelApi({url : `/api/conversation/message/${conversationId}`, method:"GET", token:token}).then(res => {
        return (res);
    })
}