import crashlytics from '@react-native-firebase/crashlytics';
import perf from '@react-native-firebase/perf';




export const FetchPeelApi = async ({ url, method, body, token, firebaseToken }) => {
    const trace = await perf().startTrace('FetchPeelApi');
    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, 10000);
    });
    try {
        if (process.env.NODE_ENV === "development") {
            console.log("url : ", `${process.env.API_LINK}${url}`);
            console.log("method : ", method);
            // console.log("body : ", body);
            console.log("token : ", token);
        }

        const responsePromise = fetch(`${process.env.API_LINK}${url}`, {
            headers: {
                "Content-Type": "Application/json",
                ...token && {
                    "authorization": token
                },
                ...firebaseToken && {
                    "firebaseToken": firebaseToken
                }
            },
            method: method,
            ...body && {
                body: JSON.stringify(body)
            }
        });


        crashlytics().log("\n\n FetchPeelApi")
        const response = await Promise.race([responsePromise, timeout]);
        const dataJson = await response.json();
        if (process.env.NODE_ENV === "development") {
            console.log("dataJson : ", dataJson);
        }
        let status_code = response.status;
        if (status_code < 200 || status_code >= 300) {
            throw new Error(dataJson.message);
        }
        dataJson.success = true;
        crashlytics().log("dataJson : ", dataJson);
        trace.stop();
        return dataJson;
    }
    catch (error) {
        crashlytics().recordError(error);
        if (process.env.NODE_ENV === "development") {
            console.log("error fetch : ", error);
        }
        trace.stop();
        return Promise.reject(error);
    }

}

