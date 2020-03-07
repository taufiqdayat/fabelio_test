import {GET_PRODUCT_SUCCESS, FILTER_PROD_STYLE, SEARCH_PRODUCT_SUCCESS, FILTER_PROD_DELIV} from '../actionTypes';

const INIT_STATE = {
    ftrArr:[],
    dlvArr:[],
    list_product:[],
    list_after_filter_style:[],
    list_after_filter_deliv:[],
    furniture_styles:[],
    delivery_time:[
        {
            name:"1 Week",
            select:false
        },
        {
            name:"2 Weeks",
            select:false
        },
        {
            name:"1 Month",
            select:false
        },
        {
            name:"More",
            select:false
        },
    ],
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
        case SEARCH_PRODUCT_SUCCESS:
            var searchkey = new RegExp(action.payload.searchVal.toLowerCase());
            var allData = action.payload.data.products;

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

            let lastResFtr = [];

            if (state.dlvArr.length<1) {
                if(ftrArr.length<1){
                    lastResFtr = state.all_product
                }else{
                    lastResFtr=resFilStyle
                }
            }else{
                if(ftrArr.length<1){
                    for (let jj = 0; jj < state.list_after_filter_deliv.length; jj++) {
                        lastResFtr.push(state.list_after_filter_deliv[jj])}
                }else{
                    for (let jj = 0; jj < resFilStyle.length; jj++) {
                        lastResFtr.push(
                            ...(state.list_after_filter_deliv.filter((inner)=>inner.delivery_time===resFilStyle[jj].delivery_time)))
                    }
                }
            }

            lastResFtr = lastResFtr.filter((el, id, self)=>{
                return id === self.indexOf(el)
            })

            return {
                ...state,
                furniture_styles:[...action.payload.filterStyl],
                list_after_filter_style:resFilStyle,
                list_product:lastResFtr,
                ftrArr:ftrArr
            }
        case FILTER_PROD_DELIV:
            const {filterDeliv} = action.payload;

            var dlvArr = filterDeliv.filter((ft)=>{
                return ft.select===true
            }).map((ft)=>{
                return ft.name
            })
            
            // var aaa = [...state.list_product]
            var ddd = []

            var resDevFilStyle = (days) =>{
                let a = state.all_product.filter((el)=>{
                    if(days=="1 Week"){
                        return parseInt(el.delivery_time)  <= 7
                    }else if(days=="2 Weeks"){
                        return parseInt(el.delivery_time)  > 7 && parseInt(el.delivery_time) <= 14
                    }else if(days=="1 Month"){
                        return parseInt(el.delivery_time) > 14 && parseInt(el.delivery_time) <= 30
                    }else if(days=="More"){
                        return parseInt(el.delivery_time) > 30
                    } else {
                        return el
                    }
                })
                return a.map(ll=> ll)
            }

            for (let ii = 0; ii < dlvArr.length; ii++) {
                ddd.push(...resDevFilStyle(dlvArr[ii]))
            }

            let lastResDev = [];

            if(state.ftrArr.length<1){
                if(dlvArr.length<1){
                    lastResDev = state.all_product
                }else{
                    lastResDev=ddd
                }
            }else{
                if (dlvArr.length<1) {
                    for (let jj = 0; jj < state.list_after_filter_style.length; jj++) {
                        lastResDev.push(state.list_after_filter_style[jj])}
                }else{
                    for (let jj = 0; jj < ddd.length; jj++) {
                        lastResDev.push(
                            ...(state.list_after_filter_style.filter((inner)=>inner.delivery_time===ddd[jj].delivery_time)))
                    }
                }
            }

            lastResDev = lastResDev.filter((el, id, self)=>{
                return id === self.indexOf(el)
            })

            console.log(lastResDev, "oke");
            return {
                ...state,
                delivery_time:[...action.payload.filterDeliv],
                list_after_filter_deliv:ddd,
                list_product:lastResDev,
                dlvArr:dlvArr
            }
        default:
            return state
    }
}
