import { fork, takeEvery, put, all, call } from "redux-saga/effects"
import { GET_PRODUCT, SEARCH_PRODUCT } from "../actionTypes"
import { getListProductSuccess, searchListProductSuccess } from "../actions/Product"
import { showMessage, showLoader, hideLoader } from "../actions/Process"
import prod from '../api/v1/Product';

const doGetProduct = async()=>await prod.getProduct().then(resp=>resp).catch(error=>error)

function* _getProduct(){
    yield put(showLoader())
    try{
        const resp = yield call(doGetProduct)
        yield put(getListProductSuccess(resp))
    }catch(error){
        yield put(showMessage("error api"))
    }
    yield put(hideLoader())
}

function* _searchProd({payload}){
    yield put(showLoader())
    try{
        const resp = yield call(doGetProduct)
        yield put(searchListProductSuccess(resp, payload.searchVal))
    }catch(error){
        yield put(showMessage("error api"))
    }
    yield put(hideLoader())
}

export function* getProduct(){
    yield takeEvery(GET_PRODUCT, _getProduct)
}

export function* searchProd(){
    yield takeEvery(SEARCH_PRODUCT, _searchProd)
}

export default function* rootSaga() {
    yield all([
        fork(getProduct),
        fork(searchProd),
    ])
}