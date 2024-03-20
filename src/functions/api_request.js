import { addStorage, getStorage, Logout, putStorage } from './storage';
import { FetchPeelApi } from "./request_fetch";
import messaging from '@react-native-firebase/messaging';
import { update_messaging } from './update_messaging';
import crashlytics from '@react-native-firebase/crashlytics';

export const GetUser = async (defaultUser) => {
    
    crashlytics().log("\n\n GetUser")
    const token = await getStorage('token')
    return FetchPeelApi({ url: "/api/user/", method: "GET", token: token }).then(res => {
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
    putStorage('user', user);
    const token = await getStorage('token')
    return FetchPeelApi({ url: "/api/user/", method: "PUT", body: user, token: token }).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}

export const TestAuth = async () => {
    crashlytics().log("\n\n TestAuth")
    return getStorage('token').then((token) => {
        if (token == null || token == undefined) {
            crashlytics().log("User not authenticated");
            Logout();
            return false;
        }
        return getFirebaseToken().then((firebaseToken) => {
            return FetchPeelApi({ url: "/api/auth/protected", method: "GET", token: token, firebaseToken: firebaseToken }).then(({ auth, token, userId }) => {
                if (auth == null || auth == undefined || auth == false) {
                    Logout();
                    return false;
                } else {
                    crashlytics().log("User authenticated");
                    crashlytics().setUserId(userId.toString());
                    update_messaging();
                    return true;
                }
            }).catch(error => {
                crashlytics().recordError(error)
                throw error;
            });
        }).catch(error => {
            crashlytics().recordError(error)
            throw error;
        });
    }).catch(error => {
        crashlytics().recordError(error)
        throw error;
    }
    );
}

export const getFirebaseToken = async () => {
    crashlytics().log("\n\n getFirebaseToken")
    return messaging().getToken().then((firebaseToken) => {
        return firebaseToken;
    }).catch(error => {
        crashlytics().recordError(error)
        return null;
    });
}

export const IsProfileCompleted = async () => {
    crashlytics().log("\n\n IsProfileCompleted")
    return getStorage('token').then((token) => {
        return FetchPeelApi({ url: "/api/auth/verifyProfileCompleted", method: "GET", token: token }).then(({ auth, userId }) => {
            if (!auth) {
                crashlytics().log("User profile not completed");
                return false;
            } else {
                crashlytics().log("User profile completed");
                crashlytics().setUserId(userId.toString());
                return true;
            }
        }).catch(error => {
            crashlytics().recordError(error)
            return false;
        });
    }).catch(error => {
        crashlytics().recordError(error)
        return false;
    });
}


export const PostMatchList = async (filtersArray) => {
    crashlytics().log("\n\n GetMatchList")
    const token = await getStorage('token')
    const body = filtersArray
    return FetchPeelApi({ url: "/api/match/getSwipeProfilUser", method: "POST", body: body, token: token }).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
        throw error;
    });
}

export const sendSwipe = async (user_target, typeOfLike) => {
    crashlytics().log("\n\n sendSwipe")

    const token = await getStorage('token')
    const body = { statelike: typeOfLike }
    return FetchPeelApi({ url: `/api/match/like_dislike/${user_target._id}`, method: "POST", body: body, token: token }).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}

export const loginRequest = async (email, password, navigation) => {
    crashlytics().log("\n\nlogin request")
    return getFirebaseToken().then((firebaseToken) => {
        const body = { email: email.toLowerCase(), password: password }
        return FetchPeelApi({ url: `/api/auth/login`, method: "POST", body: body, firebaseToken: firebaseToken }).then(res => {
            addStorage("token", res['token'].toString())
            addStorage("userId", res['userId'].toString())
            crashlytics().log("connecté")
            crashlytics().setUserId(res['userId'].toString());
            navigation.navigate("Auth");
            update_messaging();
            return { error: false, message: "connecté" };
        }).catch(error => {
            crashlytics().recordError(error);
            return { error: true, message: error.message };
        });
    }).catch(error => {
        crashlytics().recordError(error);
        return { error: true, message: error.message };
    });
}

export const registerRequest = async (email, password, navigation) => {
    crashlytics().log("\n\nregister request")
    return getFirebaseToken().then((firebaseToken) => {
        const body = { email: email.toLowerCase(), password: password }
        return FetchPeelApi({ url: `/api/auth/register`, method: "POST", body: body, firebaseToken: firebaseToken }).then(res => {
            addStorage("token", res['token'])
            addStorage("userId", res['userId'].toString())
            crashlytics().log("connecté")
            crashlytics().setUserId(res['userId'].toString());
            navigation.navigate("Profile");
            update_messaging();
            return { error: false, message: "connecté" };
        }).catch((error) => {
            crashlytics().recordError(error)
            return { error: true, message: error.message };
        })
    }).catch(error => {
        crashlytics().recordError(error);
        return { error: true, message: error.message };
    });
}

export const getInterestList = async () => {
    crashlytics().log("\n\n GetInterestList")
    return FetchPeelApi({ url: "/api/interest", method: "GET" }).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error);
    });
}

export const getQuestionList = async () => {
    crashlytics().log("\n\n getQuestionList")
    return FetchPeelApi({ url: "/api/question", method: "GET" }).then(res => {
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
    const token = await getStorage('token')
    return FetchPeelApi({ url: "/api/conversation/", method: "GET", token: token }).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
        throw error;
    });
}

export const getMessageList = async (conversationId) => {
    crashlytics().log("\n\n getMessageList")
    const token = await getStorage('token')
    return FetchPeelApi({ url: `/api/conversation/message/${conversationId}`, method: "GET", token: token }).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}

export const sendMessage = async (conversationId, message) => {
    crashlytics().log("\n\n sendMessage : ", message)
    const token = await getStorage('token')
    const body = { message: message }
    return FetchPeelApi({ url: `/api/conversation/message/${conversationId}`, method: "POST", token: token, body: body }).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
};

export const createInstantConversation = async (user2) => {
    crashlytics().log("\n\n createInstantConversation with:", user2._id)
    const token = await getStorage('token')
    const body = { user2: user2 }
    return FetchPeelApi({ url: `/api/conversation/instant`, method: "POST", token: token, body: body }).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}

export const getNumberOfMessages = async (conversationId) => {
    crashlytics().log("\n\n getNumberOfMessages")
    const token = await getStorage('token')
    return FetchPeelApi({ url: `/api/conversation/${conversationId}/nb_messages`, method: "GET", token: token }).then(res => {
        return (res);
    }).catch(error => {
        crashlytics().recordError(error)
    });
}