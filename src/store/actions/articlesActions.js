import {
    ADD_ARTICLE_FAILURE,
    ADD_ARTICLE_REQUEST,
    ARTICLE_INIT,
    EDIT_ARTICLE_FAILURE,
    EDIT_ARTICLE_REQUEST,
    GET_ARTICLE_REQUEST,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    REMOVE_ARTICLE_FAILURE,
    REMOVE_ARTICLE_REQUEST
} from "./actionsTypes";

export const addArticleRequest = articleData => ({type: ADD_ARTICLE_REQUEST, articleData})
export const addArticleFailure = error => ({type: ADD_ARTICLE_FAILURE, error})

export const removeArticleRequest = id => ({type: REMOVE_ARTICLE_REQUEST, id})
export const removeArticleFailure = error => ({type: REMOVE_ARTICLE_FAILURE, error})

export const editArticleRequest = (articleData, id) => ({type: EDIT_ARTICLE_REQUEST, articleData, id})
export const editArticleFailure = error => ({type: EDIT_ARTICLE_FAILURE, error})

export const getArticlesRequest = category => ({type: GET_ARTICLES_REQUEST, category})
export const getArticlesSuccess = articles => ({type: GET_ARTICLES_SUCCESS, articles})

export const getArticleRequest = id => ({type: GET_ARTICLE_REQUEST, id})
export const getArticleSuccess = article => ({type: GET_ARTICLE_SUCCESS, article})

export const articleInit = () => ({type: ARTICLE_INIT})