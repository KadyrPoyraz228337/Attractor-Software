import {createBrowserHistory} from "history";
import {applyMiddleware, compose, createStore} from "redux";
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import rootSaga from "./rootSaga";
import createRootReducer from './reducers'

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
    localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(createRootReducer(history), persistedState, enhancers);

sagaMiddleware.run(rootSaga)

export default store;