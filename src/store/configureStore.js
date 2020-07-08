import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {routerMiddleware, connectRouter} from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import rootSaga from "./rootSaga";
import usersReducer from "./reducers/usersReducer";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createRootReducer = history => combineReducers({
    router: connectRouter(history),
    users: usersReducer,
})

const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
    localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

export const store = createStore(createRootReducer(history), persistedState, enhancers);

store.replaceReducer(createRootReducer(history))

sagaMiddleware.run(rootSaga)

export default store;