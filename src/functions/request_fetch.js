import crashlytics from '@react-native-firebase/crashlytics';

export const FetchPeelApi = async ({ url, method, body, token, firebaseToken }) => {

    try {
        crashlytics().log("\n\n FetchPeelApi")
        const response = await fetch(`${process.env.API_LINK}${url}`, {
            headers: {
            "Content-Type": "Application/json",
            ...token && {
                "authorization":token
            },
            ...firebaseToken && {
                "firebaseToken":firebaseToken
            }
            },
            method: method,
            ...body && {
            body:JSON.stringify(body)
            }
        });
        console.log("dataJson : ", response);
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        dataJson.success = true;
        crashlytics().log("dataJson : ", dataJson);
        return dataJson;
    }
    catch (error) {
        crashlytics().recordError(error);
        return Promise.reject(error);
    }
}

