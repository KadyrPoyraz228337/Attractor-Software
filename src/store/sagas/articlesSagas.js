import axiosApi from "../../axiosApi";
import {
    addArticleFailure,
    editArticleFailure,
    getArticlesSuccess,
    getArticleSuccess,
    removeArticleFailure
} from "../actions/articlesActions";
import {
    ADD_ARTICLE_REQUEST,
    EDIT_ARTICLE_REQUEST,
    GET_ARTICLE_REQUEST,
    GET_ARTICLES_REQUEST, REMOVE_ARTICLE_REQUEST
} from "../actions/actionsTypes";
import {push} from 'connected-react-router'
import {put, takeEvery} from "redux-saga/effects";
import {toast} from "react-toastify";
import {toastConfig} from "../../config";

function* getArticles({category}) {
    const url = category ? '/articles?category=' + category : '/articles'
    const articles = yield axiosApi.get(url)
    yield put(getArticlesSuccess(articles.data))
}

function* getArticle({id}) {
    const article = yield axiosApi.get('/articles/' + id)
    yield put(getArticleSuccess(article.data))
}

function* addArticle({articleData}) {
    try {
        yield axiosApi.post('/articles', articleData)
        yield put(push('/'))
        toast.info('🦄Article added', toastConfig);
    } catch (e) {
        yield put(addArticleFailure(e))
    }
}

function* removeArticle({id}) {
    try {
        yield axiosApi.delete('/articles/'+id,)
        yield put(push('/'))
        toast.info('🦄Article removed', toastConfig);
    } catch (e) {
        yield put(removeArticleFailure(e))
    }
}

function* editArticle({articleData, id}) {
    try {
        yield axiosApi.put('/articles/'+id, articleData)
        yield put(push('/'))
        toast.info('🦄Article edited', toastConfig);
    } catch (e) {
        yield put(editArticleFailure(e))
    }
}

export default [
    takeEvery(GET_ARTICLES_REQUEST, getArticles),
    takeEvery(ADD_ARTICLE_REQUEST, addArticle),
    takeEvery(GET_ARTICLE_REQUEST, getArticle),
    takeEvery(EDIT_ARTICLE_REQUEST, editArticle),
    takeEvery(REMOVE_ARTICLE_REQUEST, removeArticle),
]
