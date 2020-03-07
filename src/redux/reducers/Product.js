import {GET_PRODUCT_SUCCESS, SEARCH_PRODUCT} from '../actionTypes';

const INIT_STATE = {
    list_product:[],
    furniture_styles:[],
    all_product:[]
}

export default(state=INIT_STATE, action)=>{
    switch(action.type){
        case GET_PRODUCT_SUCCESS:
            const{data} = action.payload;
            return {
                ...state,
                all_product:data.products,
                list_product:data.products,
                furniture_styles:data.furniture_styles
            }
        case SEARCH_PRODUCT:
            var searchkey = new RegExp(action.payload.searchVal.toLowerCase());
            var allData = state.all_product;

            var resSearch = allData.filter((el)=>{
                return searchkey.test(el.name.toLowerCase());
            })
            return {
                ...state,
                list_product:resSearch
            }
        default:
            return state
    }
}
