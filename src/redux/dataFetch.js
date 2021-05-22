import axios from "axios"

export const getReq = (url) =>{
    const Request = axios.get(url)
    return Request
}

export const postReq = (url) =>{
    const Request = axios.post(url)
    return Request
}