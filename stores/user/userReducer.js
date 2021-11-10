import * as userActionTypes from './userActions';

const initialState ={
    userType :"",
    count:0
    
}

const userReducer =(state =initialState,action) =>{
    switch(action.type){
        case userActionTypes.SET_USER_TYPE:
            return {
                ...state,
                userType:action.payload.userType
            }
        case userActionTypes.SET_COUNTbottom:
            return {
                ...state,
                count:action.payload.count
            }
        default:
            return state
    }
}

export default userReducer;


