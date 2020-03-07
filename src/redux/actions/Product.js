import { GET_PRODUCT, GET_PRODUCT_SUCCESS, SEARCH_PRODUCT } from "../actionTypes";

export const getListProduct = () =>({type:GET_PRODUCT})
export const getListProductSuccess = (data) =>({type:GET_PRODUCT_SUCCESS, payload:{data}})
export const searchListProduct = (searchVal='') => ({type:SEARCH_PRODUCT, payload:{searchVal}})