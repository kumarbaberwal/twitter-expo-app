import { useAuth } from "@clerk/clerk-expo";
import axios, { AxiosInstance } from 'axios';


export const API_URL = "https://twitter-node-js.vercel.app"
// const API_URL = "http://192.168.145.140:3000/api";


export const createApiClient = (getToken: () => Promise<string | null>): AxiosInstance => {
    const api = axios.create({ baseURL: API_URL })


    api.interceptors.request.use(async (config) => {
        const token = await getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    return api
}


export const useApiClient = (): AxiosInstance => {
    const { getToken } = useAuth()
    return createApiClient(getToken)
}

export const userApi = {
    syncUser: (api: AxiosInstance) => api.post("/users/sync"),
    getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
    updateProfile: (api: AxiosInstance, data: any) => api.put("/users/profile", data)
}