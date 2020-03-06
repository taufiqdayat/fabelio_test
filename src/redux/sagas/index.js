import {all} from 'redux-saga/effects';
import ProductSagas from './Product';

export default function* rootSaga(){
    yield all([
        ProductSagas(),
    ])
}