import {
    LOGIN_USER_FAILURE, LOGIN_USER_INIT,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_INIT,
    REGISTER_USER_REQUEST,
    LOGOUT_REQUEST
} from "./actionsTypes";

export const registerUserRequest = userData => ({type: REGISTER_USER_REQUEST, userData})
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error})
export const registerUserInit = () => ({type: REGISTER_USER_INIT})

export const loginUserRequest = userData => ({type: LOGIN_USER_REQUEST, userData})
export const loginUserSuccess = userData => ({type: LOGIN_USER_SUCCESS, userData})
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error})
export const loginUserInit = () => ({type: LOGIN_USER_INIT})

export const logoutUserRequest = userData => ({type: LOGOUT_REQUEST, userData})
export const logoutUserSuccess = () => ({type: LOGOUT_USER})