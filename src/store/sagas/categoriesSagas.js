import axiosApi from "../../axiosApi";
import {put, takeEvery} from "@redux-saga/core/effects";
import {
    addCategoryFailure,
    editCategoryFailure,
    getCategoriesSuccess,
    getOneCategorySuccess
} from "../actions/categoriesActions";
import {
    ADD_CATEGORY_REQUEST,
    DELETE_CATEGORY_REQUEST,
    EDIT_CATEGORY_REQUEST,
    GET_ALL_CATEGORIES_REQUEST,
    GET_CATEGORIES_REQUEST,
    GET_ONE_CATEGORY_REQUEST
} from "../actions/actionsTypes";
import {push} from 'connected-react-router'
import {toast} from "react-toastify";
import {toastConfig} from "../../config";

function* getCategories({category}) {
    try {
        const url = category ? `/categories/${category}` : '/categories'
        const categories = yield axiosApi.get(url);
        yield put(getCategoriesSuccess(categories.data))
    } catch (e) {
        console.log(e);
    }
}

function* getAllCategories() {
    try {
        const categories = yield axiosApi.get('/categories/all/get');
        yield put(getCategoriesSuccess(categories.data))
    } catch (e) {
        console.log(e);
    }
}

function* getOneCategory({category}) {
    try {
        const oneCategory = yield axiosApi.get('/categories/one/'+category);
        yield put(getOneCategorySuccess(oneCategory.data))
    } catch (e) {
        console.log(e);
    }
}

function* addCategory({categoryData}) {
    try {
        yield axiosApi.post('/categories', categoryData);
        yield put(push('/'))
        toast.info(`Category added`, toastConfig);
    } catch (e) {
        yield put(addCategoryFailure(e))
    }
}

function* editCategory({categoryData, id}) {
    try {
        yield axiosApi.put('/categories/' + id, categoryData);
        yield put(push('/'))
        toast.info('🦄Category edited', toastConfig);
    } catch (e) {
        yield put(editCategoryFailure(e))
    }
}

function* deleteCategory({category}) {
    try {
        yield axiosApi.delete('/categories/' + category,);
        toast.info('🦄Category removed', toastConfig);
    } catch (e) {
        console.log(e);
    }
}

export default [
    takeEvery(GET_CATEGORIES_REQUEST, getCategories),
    takeEvery(ADD_CATEGORY_REQUEST, addCategory),
    takeEvery(EDIT_CATEGORY_REQUEST, editCategory),
    takeEvery(GET_ALL_CATEGORIES_REQUEST, getAllCategories),
    takeEvery(GET_ONE_CATEGORY_REQUEST, getOneCategory),
    takeEvery(DELETE_CATEGORY_REQUEST, deleteCategory),
]