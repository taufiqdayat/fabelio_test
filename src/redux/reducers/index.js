import {combineReducers} from "redux"
import {connectRouter} from "connected-react-router"
import ProcessReducer from './Process';
import ProductReducer from './Product';

export default (history) => combineReducers({
    router:connectRouter(history),
    pcs:ProcessReducer,
    prod:ProductReducer
})