import {GET_PRODUCT_SUCCESS, SEARCH_PRODUCT, FILTER_PROD_STYLE} from '../actionTypes';

const INIT_STATE = {
    list_product:[],
    furniture_styles:[],
    all_product:[],
    searchValue:'',
}

export default(state=INIT_STATE, action)=>{
    switch(action.type){
        case GET_PRODUCT_SUCCESS:
            const{data} = action.payload;

            let new_furniture_styles = []
            if(data.furniture_styles.length>0){
                for (let id = 0; id < data.furniture_styles.length; id++) {
                    new_furniture_styles.push({
                        name:data.furniture_styles[id],
                        select:false
                    })
                }
            }

            return {
                ...state,
                all_product:data.products,
                list_product:data.products,
                furniture_styles:[...new_furniture_styles],
                searchValue:""
            }
        case SEARCH_PRODUCT:
            var searchkey = new RegExp(action.payload.searchVal.toLowerCase());
            var allData = state.all_product;

            var resSearch = allData.filter((el)=>{
                return searchkey.test(el.name.toLowerCase());
            })
            return {
                ...state,
                list_product:resSearch,
                all_product:resSearch,
                searchValue:action.payload.searchVal.toLowerCase()
            }
        case FILTER_PROD_STYLE:
            const {filterStyl} = action.payload;

            var ftrArr = filterStyl.filter((ft)=>{
                return ft.select===true
            }).map((ft)=>{
                return ft.name
            })

            var resFilStyle = state.all_product.filter((el)=>{
                var cats = el.furniture_style
                console.log(cats, "cats")
                return cats.filter((cat)=>{
                    return ftrArr.indexOf(cat) > -1;
                }).length === ftrArr.length
            })
            console.log(resFilStyle, 'oke')

            if(ftrArr.length<1){
                resFilStyle=state.all_product
            }

            console.log(ftrArr.length, 'leng')

            return {
                ...state,
                furniture_styles:[...action.payload.filterStyl],
                list_product:resFilStyle
            }
        default:
            return state
    }
}
