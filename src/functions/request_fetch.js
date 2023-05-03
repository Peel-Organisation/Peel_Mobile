
export const FetchPeelApi = async ({ url, method, body, token, firebaseToken }) => {

    try {
        console.log(`${process.env.API_LINK}${url}`)
        console.log("firebaseToken : ", firebaseToken)
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
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        dataJson.success = true;
        console.log("dataJson : ", dataJson);
        return dataJson;
    }
    catch (error) {
        console.log("error : ", error)
        return Promise.reject(error);
    }
}

