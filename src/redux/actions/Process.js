import { SHOW_MESSAGE, SHOW_LOADER, HIDE_LOADER } from "../actionTypes";

export const showMessage = (message, status="error") =>({type:SHOW_MESSAGE, payload:{message, status}})
export const hideMessage = () =>({type:SHOW_MESSAGE})
export const showLoader = ()=>({type:SHOW_LOADER})
export const hideLoader = ()=>({type:HIDE_LOADER})