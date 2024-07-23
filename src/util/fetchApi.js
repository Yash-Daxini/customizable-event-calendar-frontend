const env = import.meta.env;

export const fetchApi = async (endPoint, token, method = 'GET', body = null) => {

    const options = getFetchOptions(method, body, token);

    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch(`${env.VITE_Domain}${endPoint}`, options);

        let data = await response.json();

        return {
            status: response.status,
            data: data
        }
    }
    catch (error) {
        throw error;
    }
}

const getFetchOptions = (method, body, token) => {

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    }

    if (body)
        options.body = JSON.stringify(body);

    return options;
}