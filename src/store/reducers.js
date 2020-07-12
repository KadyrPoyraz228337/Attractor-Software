import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import usersReducer from "./reducers/usersReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import articlesReducer from "./reducers/articlesReducer";

export default history => combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    categories: categoriesReducer,
    articles: articlesReducer
})