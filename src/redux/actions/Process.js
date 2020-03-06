import { SHOW_MESSAGE } from "../actionTypes";

export const showMessage = (message, status="error") =>({type:SHOW_MESSAGE, payload:{message, status}})
export const hideMessage = () =>({type:SHOW_MESSAGE})