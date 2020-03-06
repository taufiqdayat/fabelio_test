import { fork, takeEvery, put, all, call } from "redux-saga/effects"
import { GET_PRODUCT } from "../actionTypes"
import { getListProductSuccess } from "../actions/Product"
import { showMessage } from "../actions/Process"
import prod from '../api/v1/Product';

const doGetProduct = async()=>await prod.getProduct().then(resp=>resp).catch(error=>error)

function* _getProduct(){
    try{
        const resp = yield call(doGetProduct)
        yield put(getListProductSuccess(resp))
    }catch(error){
        yield put(showMessage("error api"))
    }
}

export function* getProduct(){
    yield takeEvery(GET_PRODUCT, _getProduct)
}

export default function* rootSaga() {
    yield all([
        fork(getProduct),
    ])
}