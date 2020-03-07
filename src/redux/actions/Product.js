import { GET_PRODUCT, GET_PRODUCT_SUCCESS, SEARCH_PRODUCT, FILTER_PROD_STYLE, SEARCH_PRODUCT_SUCCESS, FILTER_PROD_DELIV } from "../actionTypes";

export const getListProduct = () =>({type:GET_PRODUCT})
export const getListProductSuccess = (data) =>({type:GET_PRODUCT_SUCCESS, payload:{data}})
export const searchListProduct = (searchVal='') => ({type:SEARCH_PRODUCT, payload:{searchVal}})
export const searchListProductSuccess = (data, searchVal) => ({type:SEARCH_PRODUCT_SUCCESS, payload:{data, searchVal}})
export const changeFilterProdStyle = (filterStyl) => ({type:FILTER_PROD_STYLE, payload:{filterStyl}})
export const changeFilterDelivTime = (filterDeliv) => ({type:FILTER_PROD_DELIV, payload:{filterDeliv}})