import axiosApi from '../../axiosApi'
import {put, takeEvery} from "@redux-saga/core/effects";
import {LOGIN_USER_REQUEST, LOGOUT_REQUEST, REGISTER_USER_REQUEST} from "../actions/actionsTypes";
import {loginUserFailure, loginUserSuccess, logoutUserSuccess, registerUserFailure} from "../actions/usersActions";
import {push} from 'connected-react-router'
import {toast} from "react-toastify";
import {toastConfig} from "../../config";

function* registerUser({userData}) {
    try {
        yield axiosApi.post('/users', userData)
        yield put(push('/'))
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
        yield axiosApi.delete('/users/sessions')
        yield put(logoutUserSuccess())
        yield put(push('/login'))
        toast.info('🦄Logout successful!', toastConfig);
    } catch (e) {
        yield put(logoutUserSuccess())
    }
}

export default [
    takeEvery(REGISTER_USER_REQUEST, registerUser),
    takeEvery(LOGIN_USER_REQUEST, loginUser),
    takeEvery(LOGOUT_REQUEST, logoutUser)
]