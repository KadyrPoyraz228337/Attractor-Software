import axios from 'axios'
import {apiURL} from "./config";
import store from "./store/configureStore";
import {logoutUserRequest} from "./store/actions/usersActions";

const axiosApi = axios.create({
    baseURL: apiURL
})

axiosApi.interceptors.request.use(config => {
    if (store.getState().users.user) {
        const token = store.getState().users.user.token;
        config.headers.Authorization = 'token ' + token;
    }
    return config;
});

axiosApi.interceptors.response.use(config => config, error => {
    if (error.response.data.error === "Access denied") {
        store.dispatch(logoutUserRequest())
    }
    return Promise.reject(error)
});

export default axiosApi