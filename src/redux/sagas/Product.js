import { fork, takeEvery, put, all } from "redux-saga/effects"
import { GET_PRODUCT } from "../actionTypes"

function* _getProduct(){
    // function will be here
    console.log("saga")
}

export function* getProduct(){
    yield takeEvery(GET_PRODUCT, _getProduct)
}

export default function* rootSaga() {
    yield all([
        fork(getProduct),
    ])
}