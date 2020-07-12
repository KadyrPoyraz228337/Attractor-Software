import {
    ADD_CATEGORY_FAILURE,
    EDIT_CATEGORY_FAILURE,
    GET_CATEGORIES_SUCCESS,
    GET_ONE_CATEGORY_SUCCESS
} from "../actions/actionsTypes";

const INITIAL_STATE = {
    categories: null,
    category: null,
    error: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return {...state, categories: action.categories}

        case ADD_CATEGORY_FAILURE:
            return {...state, error: action.error.response}
        case EDIT_CATEGORY_FAILURE:
            return {...state, error: action.error.response}

        case GET_ONE_CATEGORY_SUCCESS:
            return {...state, category: action.category}

        default:
            return state
    }
}