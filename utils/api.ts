import { useAuth } from "@clerk/clerk-expo";
import axios, { AxiosInstance } from 'axios';


export const API_URL = "https://twitter-node-js.vercel.app"
// const API_URL = "http://192.168.133.140:3000";


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
    updateProfile: (api: AxiosInstance, data: any) => api.put("/users/profile", data),
    followUser: (api: AxiosInstance, targetUserId: string) => api.post(`/users/follow/${targetUserId}`),
    getUserProfile: (api: AxiosInstance, targetUserId: string) => api.get(`/users/profile/${targetUserId}`),
}


export const postApi = {
    createPost: (api: AxiosInstance, data: { content: string, image?: string }) => api.post("/posts", data),
    getPosts: (api: AxiosInstance) => api.get("/posts"),
    getUserPosts: (api: AxiosInstance, userName: string) => api.get(`/posts/user/${userName}`),
    likePost: (api: AxiosInstance, postId: string) => api.post(`/posts/${postId}/like`),
    deletePost: (api: AxiosInstance, postId: string) => api.delete(`/posts/${postId}/`),
}


export const commentApi = {
    createComment: (api: AxiosInstance, postId: string, content: string) => api.post(`/comments/post/${postId}`, { content }),
    deleteComment: (api: AxiosInstance, commentId: string) => api.delete(`/comments/${commentId}`),
}