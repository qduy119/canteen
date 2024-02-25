import axios from "axios";
import { updateAccessToken } from "../features/auth/authSlice";
import { baseUrl } from "../utils";

let store;

export const injectStore = (_store) => {
    store = _store;
};

const refreshToken = () => {
    return axios.get(`${baseUrl}/refresh-token`, {
        withCredentials: true,
    });
};

const createAxiosInstance = () => {
    const accessToken = store.getState().auth.accessToken;
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    axiosInstance.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response && error.response.status === 401) {
                const res = await refreshToken();
                const { token: newAccessToken } = res.data;
                store.dispatch(updateAccessToken({ newAccessToken }));
                const originalRequest = error.config;
                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
};

export default createAxiosInstance;
