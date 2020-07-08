import {
    LOGIN_USER_FAILURE, LOGIN_USER_INIT,
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_INIT
} from "../actions/actionsTypes";

const INITIAL_STATE = {
    user: null,
    regError: null,
    loginError: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case REGISTER_USER_FAILURE:
            return {...state, regError: action.error.response}
        case REGISTER_USER_INIT:
            return {...state, regError: null}
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.userData}
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error.response.data.message}
        case LOGIN_USER_INIT:
            return {...state, loginError: null}
        case LOGOUT_USER:
            return {...state, user: null}
        default: return state
    }
}