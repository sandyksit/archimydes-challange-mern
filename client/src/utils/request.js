import axios from "axios";

export async function doRequest(url, method= 'get', dataOrParams) {
    const params = method === 'get' ? dataOrParams : {}
    const data = method !== 'get' ? dataOrParams : undefined
    return await axios({url, method, data, params})
}