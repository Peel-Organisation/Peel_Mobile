import crashlytics from '@react-native-firebase/crashlytics';
import perf from '@react-native-firebase/perf';


export const FetchPeelApi = async ({ url, method, body, token, firebaseToken }) => {
    const trace = await perf().startTrace('FetchPeelApi');
    try {
        crashlytics().log("\n\n FetchPeelApi")
        console.log(`${process.env.API_LINK}${url}`)
        const response = await fetch(`${process.env.API_LINK}${url}`, {
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
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        dataJson.success = true;
        crashlytics().log("dataJson : ", dataJson);
        trace.stop();
        return dataJson;
    }
    catch (error) {
        crashlytics().recordError(error);
        trace.stop();
        return Promise.reject(error);
    }
}

