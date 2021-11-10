import { combineReducers } from "redux";

import tabReducer from "./tab/tabReducer";
import userReducer from './user/userReducer'
import customerReducer from "./customer/customerReducer";
export default combineReducers({
    tabReducer,
    userReducer,
    customerReducer
})