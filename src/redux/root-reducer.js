import { combineReducers } from "redux";

import searchReducer from "./search/search.reducer";
import itemReducer from "./item/item.reducer"


const rootReducer = combineReducers({
    search: searchReducer,
    item: itemReducer
})

export default rootReducer;