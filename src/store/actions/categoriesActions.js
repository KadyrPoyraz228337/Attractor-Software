import {
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_REQUEST,
    DELETE_CATEGORY_REQUEST,
    EDIT_CATEGORY_FAILURE,
    EDIT_CATEGORY_REQUEST,
    GET_ALL_CATEGORIES_REQUEST,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_ONE_CATEGORY_REQUEST,
    GET_ONE_CATEGORY_SUCCESS
} from "./actionsTypes";

export const getCategoriesRequest = category => ({type: GET_CATEGORIES_REQUEST, category})
export const getCategoriesSuccess = categories => ({type: GET_CATEGORIES_SUCCESS, categories})

export const addCategoryRequest = categoryData => ({type: ADD_CATEGORY_REQUEST, categoryData})
export const addCategoryFailure = error => ({type: ADD_CATEGORY_FAILURE, error})

export const getAllCategoriesRequest = () => ({type: GET_ALL_CATEGORIES_REQUEST})

export const getOneCategoryRequest = category => ({type: GET_ONE_CATEGORY_REQUEST, category})
export const getOneCategorySuccess = category => ({type: GET_ONE_CATEGORY_SUCCESS, category})

export const editCategoryRequest = (categoryData, id) => ({type: EDIT_CATEGORY_REQUEST, categoryData, id})
export const editCategoryFailure = error => ({type: EDIT_CATEGORY_FAILURE, error})

export const deleteCategoryRequest = category => ({type: DELETE_CATEGORY_REQUEST, category})
