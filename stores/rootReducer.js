import { combineReducers } from "redux";

import tabReducer from "./tab/tabReducer";
import userReducer from './user/userReducer'

export default combineReducers({
    tabReducer,
    userReducer,
})