import { GET_PRODUCT, GET_PRODUCT_SUCCESS } from "../actionTypes";

export const getListProduct = () =>({type:GET_PRODUCT})
export const getListProductSuccess = (data) =>({type:GET_PRODUCT_SUCCESS, payload:{data}})