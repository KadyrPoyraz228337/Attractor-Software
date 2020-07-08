import {all} from "@redux-saga/core/effects";
import usersSagas from "./sagas/usersSagas";

export default function* rootSaga() {
    yield all([
        ...usersSagas
    ])
}