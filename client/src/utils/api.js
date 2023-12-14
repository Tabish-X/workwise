import axios from "axios"

const url = "http://localhost:3000"

export const authApi = axios.create({
    baseURL: `${url}/auth`,
    withCredentials: true
})

export const profilApi = axios.create({
    baseURL: `${url}/profile`,
    withCredentials: true
})

export const postApi = axios.create({
    baseURL: `${url}/posts`,
    withCredentials: true
})

export const usersApi = axios.create({
    baseURL: `${url}/users`,
    withCredentials: true
})