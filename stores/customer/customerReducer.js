import * as customerActionTypes from './customerActions';

const initialState ={
    language:"",
    paymentMethod:"",
    username: '', 
    mobile: '', 
    lastname: "",
    mapCoords:null,
    address:null

    
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
                paymentMethod:action.payload.paymentMethod
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
        case customerActionTypes.SET_CUSTOMER_MAP_COORDS:
            return {
                ...state,
                mapCoords:action.payload.mapCoords
            }
        case customerActionTypes.SET_CUSTOMER_ADDRESS:
            return {
                ...state,
                address:action.payload.address
            }
        default:
            return state
    }
}

export default customerReducer;