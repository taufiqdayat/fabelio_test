import {GET_PRODUCT_SUCCESS} from '../actionTypes';

const INIT_STATE = {
    list_product:[],
    furniture_styles:[]
}

export default(state=INIT_STATE, action)=>{
    switch(action.type){
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                list_product:action.payload.data.products,
                furniture_styles:action.payload.data.furniture_styles
            }
        default:
            return state
    }
}
