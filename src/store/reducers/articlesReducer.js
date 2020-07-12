import {
    ADD_ARTICLE_FAILURE,
    ARTICLE_INIT,
    EDIT_ARTICLE_FAILURE,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLES_SUCCESS, REMOVE_ARTICLE_FAILURE
} from "../actions/actionsTypes";

const INITIAL_STATE = {
    articles: null,
    error: null,
    article: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ARTICLES_SUCCESS:
            return {...state, articles: action.articles}
        case GET_ARTICLE_SUCCESS:
            return {...state, article: action.article}

        case ADD_ARTICLE_FAILURE:
            return {...state, error: action.error}
        case EDIT_ARTICLE_FAILURE:
            return {...state, error: action.error}
        case REMOVE_ARTICLE_FAILURE:
            return {...state, error: action.error}

        case ARTICLE_INIT:
            return {...state, error: null}
        default: return state
    }
}