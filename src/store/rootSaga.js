import {all} from "@redux-saga/core/effects";
import usersSagas from "./sagas/usersSagas";
import categoriesSagas from "./sagas/categoriesSagas";
import articlesSagas from "./sagas/articlesSagas";

export default function* rootSaga() {
    yield all([
        ...usersSagas,
        ...categoriesSagas,
        ...articlesSagas
    ])
}