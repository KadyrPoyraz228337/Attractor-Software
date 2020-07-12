import axiosApi from '../../axiosApi'
import {put, takeEvery} from "@redux-saga/core/effects";
import {
    DELETE_USER_REQUEST,
    EDIT_USER_REQUEST,
    GET_USER_REQUEST,
    LOGIN_USER_REQUEST,
    LOGOUT_REQUEST,
    REGISTER_USER_REQUEST
} from "../actions/actionsTypes";
import {
    editUserFailure,
    getUserSuccess,
    loginUserFailure,
    loginUserSuccess,
    logoutUserSuccess,
    registerUserFailure
} from "../actions/usersActions";
import {push} from 'connected-react-router'
import {toast} from "react-toastify";
import {toastConfig} from "../../config";

function* registerUser({userData}) {
    try {
        yield axiosApi.post('/users', userData)
        yield put(push('/login'))
        toast.info('🦄Register successful!', toastConfig);
    } catch (e) {
        yield put(registerUserFailure(e))
    }
}

function* loginUser({userData}) {
    try {
        const resp = yield axiosApi.post('/users/sessions', userData)
        yield put(loginUserSuccess(resp.data))
        yield put(push('/'))
        toast.info('🦄Login successful!', toastConfig);
    } catch (e) {
        yield put(loginUserFailure(e))
    }
}

function* logoutUser() {
    try {
        yield put(push('/login'))
        yield axiosApi.delete('/users/sessions')
        yield put(logoutUserSuccess())
        toast.info('🦄Logout successful!', toastConfig);
    } catch (e) {
        yield put(logoutUserSuccess())
    }
}

function* getUser({user}) {
    try {
        const resp = yield axiosApi.get('/users/'+user)
        yield put(getUserSuccess(resp.data))
    } catch (e) {
        yield put(logoutUserSuccess())
    }
}

function* editUser({user, id}) {
    try {
        yield axiosApi.put('/users/'+id, user)
        yield put(logoutUserSuccess())
        yield put(push('/login'))
        toast.info('🦄User edited', toastConfig);
    } catch (e) {
        yield put(editUserFailure(e))
    }
}

function* deleteUser({user}) {
    try {
        yield axiosApi.delete('/users/'+user)
        yield put(logoutUserSuccess())
        yield put(push('/login'))
        toast.info('🦄User removed!', toastConfig);
    } catch (e) {
        yield put(logoutUserSuccess())
        yield put(push('/login'))
    }
}

export default [
    takeEvery(REGISTER_USER_REQUEST, registerUser),
    takeEvery(LOGIN_USER_REQUEST, loginUser),
    takeEvery(LOGOUT_REQUEST, logoutUser),
    takeEvery(GET_USER_REQUEST, getUser),
    takeEvery(EDIT_USER_REQUEST, editUser),
    takeEvery(DELETE_USER_REQUEST, deleteUser),
]