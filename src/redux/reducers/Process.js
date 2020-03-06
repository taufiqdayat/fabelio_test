import { SHOW_MESSAGE, HIDE_MESSAGE } from "../actionTypes"
import { NotificationManager } from 'react-notifications';

const INIT_STATE = {
    message:'',
    showMessage:false,
}

export default(state=INIT_STATE, action)=>{
    switch(action.type){
        case SHOW_MESSAGE:
            if(action.payload.status=="error"){
                NotificationManager.error(action.payload.message, "Error", 3000)
            }else{
                NotificationManager.info(action.payload.message, "Info", 3000)
            }
        return {
            ...state,
            message:action.payload.message,
            showMessage:true
        }

        case HIDE_MESSAGE:
            return {
                ...state, 
                message:'',
                showMessage:false
            }
        default:
            return state;
    }
}