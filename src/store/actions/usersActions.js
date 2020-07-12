import {
    LOGIN_USER_FAILURE, LOGIN_USER_INIT,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_INIT,
    REGISTER_USER_REQUEST,
    LOGOUT_REQUEST, GET_USER_REQUEST, GET_USER_SUCCESS, EDIT_USER_REQUEST, EDIT_USER_FAILURE, DELETE_USER_REQUEST
} from "./actionsTypes";

export const registerUserRequest = userData => ({type: REGISTER_USER_REQUEST, userData})
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error})
export const registerUserInit = () => ({type: REGISTER_USER_INIT})

export const loginUserRequest = userData => ({type: LOGIN_USER_REQUEST, userData})
export const loginUserSuccess = userData => ({type: LOGIN_USER_SUCCESS, userData})
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error})
export const loginUserInit = () => ({type: LOGIN_USER_INIT})

export const logoutUserRequest = () => ({type: LOGOUT_REQUEST})
export const logoutUserSuccess = () => ({type: LOGOUT_USER})

export const getUserRequest = user => ({type: GET_USER_REQUEST, user})
export const getUserSuccess = user => ({type: GET_USER_SUCCESS, user})

export const editUserRequest = (user, id) => ({type: EDIT_USER_REQUEST, user, id})
export const editUserFailure = error => ({type: EDIT_USER_FAILURE, error})

export const deleteUserRequest = user => ({type: DELETE_USER_REQUEST, user})