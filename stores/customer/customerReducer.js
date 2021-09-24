import * as customerActionTypes from './customerActions';

const initialState ={
    language:"",
    paymentMethod:"",
    username: '', 
    mobile: '', 
    lastname: "",
    mapRegion:null,

    
}

const customerReducer =(state =initialState,action) =>{
    switch(action.type){
        case customerActionTypes.SET_CUSTOMER_LANGUAGE:
            return {
                ...state,
                language:action.payload.language
            }
        case customerActionTypes.SET_CUSTOMER_PAYMENT_METHOD:
            return {
                ...state,
                language:action.payload.language
            }
        case customerActionTypes.SET_CUSTOMER_USERNAME:
            return {
                ...state,
                username:action.payload.username
            }
        case customerActionTypes.SET_CUSTOMER_LASTNAME:
            return {
                ...state,
                lastname:action.payload.lastname
            }
        case customerActionTypes.SET_CUSTOMER_MOBILE:
            return {
                ...state,
                mobile:action.payload.mobile
            }
        case customerActionTypes.SET_CUSTOMER_MAP_REGION:
            return {
                ...state,
                map_region:action.payload.map_region
            }
        default:
            return state
    }
}

export default customerReducer;