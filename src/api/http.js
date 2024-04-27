import axios from "axios";



class HttpRequest {

    constructor() { }

    async get(url, headers) {
        const resp = await axios.get(url, headers);
        return resp.data;
    }

    async post(url, body, headers) {
        const resp = await axios.post(url, body, headers)
        return resp;
    }

    async put(url, body, headers){
        const resp = await axios.put(url, body, headers)
        return resp;
    }

    async delete(url, headers){
        const resp = await axios.put(url, body, headers)
        return resp;
    }
}

export default new HttpRequest();
