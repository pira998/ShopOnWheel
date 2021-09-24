import * as userActionTypes from './userActions';

const initialState ={
    userType :"",
    
}

const userReducer =(state =initialState,action) =>{
    switch(action.type){
        case userActionTypes.SET_USER_TYPE:
            return {
                ...state,
                userType:action.payload.userType
            }
        default:
            return state
    }
}

export default userReducer;


